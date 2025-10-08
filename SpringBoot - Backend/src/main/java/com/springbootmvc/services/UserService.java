package com.springbootmvc.services;

import java.security.InvalidParameterException;
import java.security.Key;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jmx.export.UnableToRegisterMBeanException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.springbootmvc.entities.User;
import com.springbootmvc.repositories.CategoryRepository;
import com.springbootmvc.repositories.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class UserService {
	
	@Value("${jwt.secret}")
    private String jwtSecret;
	
	private Key key;
	
	@PostConstruct
    public void init() {
		key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtSecret));
    }
	
	@Autowired
	UserRepository userRepository;
	@Autowired
	CategoryRepository categoryRepository;
	
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
	public int getUserIdFromToken(String token) {
	    try 
	    {
	        Claims claims = Jwts.parserBuilder()
	                            .setSigningKey(key)
	                            .build()
	                            .parseClaimsJws(token.replace("Bearer ", ""))
	                            .getBody();
	        return Integer.parseInt(claims.getSubject());
	    } 
	    catch (Exception e) 
	    {
	        throw new RuntimeException("Invalid or expired token!");
	    }
	}
	
	public String getRoleFromToken(String token) {
	    Claims claims = Jwts.parserBuilder()
	        .setSigningKey(key) 
	        .build()
	        .parseClaimsJws(token.replace("Bearer ", ""))
	        .getBody();

	    return claims.get("role", String.class);
	}
	
	public boolean validToken(String token) {
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
	
	public void register(User user) {
		
	    if(user.getRole()!=null && user.getRole().equalsIgnoreCase("ADMIN"))
	    {
	    	throw new UnableToRegisterMBeanException("Admins are not allowed to register !!!");
	    }
	    
	    if(userRepository.findByEmail(user.getEmail()) != null)
	    {
	        throw new RuntimeException("Email already registered !!!");
	    }
	    
	    if(user.getName() == null || user.getEmail() == null || user.getPassword() == null)
	    {
	    	throw new InvalidParameterException("Please enter the required fields !!!");
	    }
	    
	    user.setPassword(passwordEncoder.encode(user.getPassword()));     
	    user.setRole("USER");
	    userRepository.save(user);
	}
	
	public String login(User user) {
		
	    User u1 = userRepository.findByEmail(user.getEmail());
	    if(u1 == null || !passwordEncoder.matches(user.getPassword(), u1.getPassword())) 
	    {
	        throw new RuntimeException("Invalid credentials !!!");
	    }

	    long expirationMillis = 1000 * 60 * 60; 
	    return Jwts.builder()
	            .setSubject(String.valueOf(u1.getId()))
	            .claim("role", u1.getRole())
	            .claim("name", u1.getName())
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
	            .signWith(key)
	            .compact();
	}
	
	public User viewUser(int id)
	{
		User user = this.userRepository.findById(id);
		if(user == null)
		{
			throw new RuntimeException("User with the given Id does not exist");
		}
		return user;
	}
	
	public List<User> viewUsersList()
	{
		List<User> users = (List<User>)userRepository.findAll();
		if(users.isEmpty())
		{
			throw new RuntimeException("Users List is empty !!!");
		}
		
		List<User> usersOnlyList = new ArrayList<User>();
		users.forEach(user -> {
			if(!user.getRole().equals("ADMIN"))
			{
				usersOnlyList.add(user);
			}
		});
		
		return usersOnlyList;
	}
	
	public User forgotPassword(User u)
	{
		if(u.getEmail().isBlank() || u.getPassword().isBlank() || u.getNewPassword().isBlank())
		{
			throw new InvalidParameterException("Please enter the required parameters !!!");
		}
		
		User user = userRepository.findByEmail(u.getEmail());
		if(user == null)
		{
			throw new RuntimeException("Email is not registered !!!");
		}
		if(!(u.getPassword().equals(u.getNewPassword())))
		{
			throw new IllegalArgumentException("Passwords must match !!!");
		}
		
		user.setPassword(passwordEncoder.encode(u.getNewPassword()));
		userRepository.save(user);
		return user;
	}
}
