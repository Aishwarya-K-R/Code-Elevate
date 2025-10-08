package com.springbootmvc.controllers;

import java.security.InvalidParameterException;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.springbootmvc.entities.User;
import com.springbootmvc.repositories.UserRepository;
import com.springbootmvc.services.CartService;
import com.springbootmvc.services.UserService;

@RestController
public class CartController {
	
	@Autowired
	UserService userService;
	@Autowired
	UserRepository userRepository;
	@Autowired
	CartService cartService;
	
	@PostMapping("/user/{uid}/add/cart/{pid}")
	public ResponseEntity<?> addToCart(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("uid") int uid, @PathVariable("pid") int pid, @RequestBody int quantity)
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
			
			User user = userRepository.findById(uid);
			if(user == null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given Id does not exist !!!");
			}
			
			if(!userService.getRoleFromToken(token).equals("USER") || userService.getUserIdFromToken(token) != uid)
			{
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is unauthorized to perform this operation !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(cartService.addToCart(uid, pid, quantity));
		}
		
		catch (InternalError e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch (InvalidParameterException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch (IllegalArgumentException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@PutMapping("/user/{uid}/update/cart/{cid}")
	public ResponseEntity<?> updateCartItem(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("uid") int uid, @PathVariable("cid") int cid, @RequestBody int quantity)
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
			
			User user = userRepository.findById(uid);
			if(user == null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given Id does not exist !!!");
			}
			
			if(!userService.getRoleFromToken(token).equals("USER") || userService.getUserIdFromToken(token) != uid)
			{
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is unauthorized to perform this operation !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(cartService.updateCartItem(uid, cid, quantity));
		}
		
		catch (InvalidParameterException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch (IllegalArgumentException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@DeleteMapping("/user/{uid}/delete/cart/{cid}")
	public ResponseEntity<?> deleteCartItem(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("uid") int uid, @PathVariable("cid") int cid)
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
			
			User user = userRepository.findById(uid);
			if(user == null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given Id does not exist !!!");
			}
			
			if(!userService.getRoleFromToken(token).equals("USER") || userService.getUserIdFromToken(token) != uid)
			{
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is unauthorized to perform this operation !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(cartService.deleteCartItem(uid, cid));
		}
		
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@GetMapping("/user/{uid}/cart")
	public ResponseEntity<?> viewCart(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("uid") int uid)
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
			
			User user = userRepository.findById(uid);
			if(user == null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given Id does not exist !!!");
			}
			
			if(!userService.getRoleFromToken(token).equals("USER") || userService.getUserIdFromToken(token) != uid)
			{
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is unauthorized to perform this operation !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(cartService.viewCart(uid));
		}
		
		catch (IllegalArgumentException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@GetMapping("/user/{uid}/cart/checkout")
	public ResponseEntity<?> cartCheckout(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("uid") int uid)
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
			
			User user = userRepository.findById(uid);
			if(user == null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with the given Id does not exist !!!");
			}
			
			if(!userService.getRoleFromToken(token).equals("USER") || userService.getUserIdFromToken(token) != uid)
			{
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is unauthorized to perform this operation !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(cartService.cartCheckout(uid));
		}
		
		catch (InvalidParameterException e) 
		{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		}
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	
}
