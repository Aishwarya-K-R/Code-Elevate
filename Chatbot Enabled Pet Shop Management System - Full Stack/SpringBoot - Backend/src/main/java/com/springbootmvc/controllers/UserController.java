package com.springbootmvc.controllers;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jmx.export.UnableToRegisterMBeanException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.springbootmvc.entities.User;
import com.springbootmvc.repositories.CartRepository;
import com.springbootmvc.repositories.ProductRepository;
import com.springbootmvc.repositories.UserRepository;
import com.springbootmvc.services.UserService;

import jakarta.validation.Valid;

@RestController
public class UserController {

	@Autowired
	UserService userService;
	@Autowired
	UserRepository userRepository;
	@Autowired
	ProductRepository productRepository;
	@Autowired
	CartRepository cartRepository;
	
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@PostMapping("/user/register")
	public ResponseEntity<String> register(@Valid @RequestBody User user)
	{
		try 
		{
			this.userService.register(user);
			return ResponseEntity.status(HttpStatus.OK).body("User Registered Successfully !!");
		}
		catch (UnableToRegisterMBeanException e) 
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
		catch(InvalidParameterException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(e.getMessage());
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user) {
	    try
	    {
	        String tokenString = userService.login(user);
	        return ResponseEntity.ok("Login successful !! Token : " + tokenString);
	    } 
	    catch (RuntimeException e) 
	    {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	    }
	    catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	    
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<?> viewDetails(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("id") int id)
	{
		try 
		{
			if (token == null || token.isEmpty()) 
			{
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
		    }
			
			if(!userService.validToken(token.replace("Bearer ", "")))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
			}
			
			int uid = userService.getUserIdFromToken(token);
			
			User user = userService.viewUser(id);
			
			if(userService.getRoleFromToken(token).equals("USER"))
			{
				if(uid!=id)
				{
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is forbidden of this functionality !!!");
				}
			}
			
			return ResponseEntity.ok(user);
		} 
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@PutMapping("/user/{id}")
	public ResponseEntity<?> updateDetails(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("id") int id, @RequestBody User user)
	{
		try 
		{
			if (token == null || token.isEmpty()) 
			{
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
		    }
			
			if(!userService.validToken(token.replace("Bearer ", "")))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
			}
			
			int uid = userService.getUserIdFromToken(token);
			
			User user1 = this.userRepository.findById(id);
			if(user1 == null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given Id does not exist !!!");
			}
			
			if(uid!=id)
			{
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is forbidden of this functionality !!!");
			}
			
			if(user.getName() != null && !(user.getName().equals(user1.getName())))
			{
				user1.setName(user.getName());
			}
		
			User updateUser = userRepository.findByEmail(user.getEmail());
					
			if(user.getEmail()!=null && updateUser!=null && updateUser.getId()!= id)
			{
				return ResponseEntity.status(HttpStatus.CONFLICT).body("User with the given Email already exists !!!");
			}
			
			user1.setEmail(user.getEmail());
			
			if(user.getPassword() != null && !user.getPassword().isBlank())
			{
				user1.setPassword(passwordEncoder.encode(user.getPassword()));
			}
			
			userRepository.save(user1);
			
			return ResponseEntity.ok(user1);
		} 

		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@PutMapping("/forgotPassword")
	public ResponseEntity<?> forgotPassword(@RequestBody User user)
	{
		try
		{
			return ResponseEntity.ok(userService.forgotPassword(user));
		}
		
		catch(InvalidParameterException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch(IllegalArgumentException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@GetMapping("/admin/users")
	public ResponseEntity<?> viewUsersList(@RequestHeader(value = "Authorization", required = false) String token)
	{
		try 
		{
			if (token == null || token.isEmpty()) 
			{
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
		    }
			
			if(!userService.validToken(token.replace("Bearer ", "")))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
			}
			
			if(userService.getRoleFromToken(token).equals("USER"))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only Admins are authorized to access users list !!!");
			}
			
			List<User> users = userService.viewUsersList();
			if(users.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No users found !!!");
			}
			return ResponseEntity.status(HttpStatus.OK).body(users);
		} 
		
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.OK).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
			
	}
}
