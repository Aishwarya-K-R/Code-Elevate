package com.springbootmvc.controllers;

import java.security.InvalidParameterException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.springbootmvc.entities.Order;
import com.springbootmvc.entities.User;
import com.springbootmvc.repositories.OrderRepository;
import com.springbootmvc.repositories.UserRepository;
import com.springbootmvc.services.OrderService;
import com.springbootmvc.services.UserService;

@RestController
public class OrderController {

	@Autowired
    UserRepository userRepository;
	@Autowired
	OrderService orderService;
	@Autowired
	UserService userService;
	@Autowired
	OrderRepository orderRepository;

	@GetMapping("/confirm/order/{oid}")
	public ResponseEntity<?> confirmOrder(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("oid") int oid)
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
			
			Order order = orderRepository.findById(oid);
			if(order == null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order with the given Id does not exist !!!");
			}
			
			if(order.getUser().getId() != userService.getUserIdFromToken(token))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is unauthorized to confirm the order !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(orderService.confirmOrder(oid));
			
		}
		
		catch (InvalidParameterException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
		
	@GetMapping("/cancel/order/{oid}")
	public ResponseEntity<?> cancelOrder(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("oid") int oid)
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
			
			Order order = orderRepository.findById(oid);
			if(order == null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order with the given Id does not exist !!!");
			}
			
			if(order.getUser().getId() != userService.getUserIdFromToken(token))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is unauthorized to cancel the order !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(orderService.cancelOrder(oid));
		}
		
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@GetMapping("/user/orders/{uid}")
	public ResponseEntity<?> viewOrders(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("uid") int uid)
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
			
			if(uid != userService.getUserIdFromToken(token))
			{
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is unauthorized to view the orders !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(orderService.viewOrderDetails(uid));
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
	
	@GetMapping("/admin/orders")
	public ResponseEntity<?> viewOrders(@RequestHeader(value = "Authorization", required = false) String token)
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
			
			if(!userService.getRoleFromToken(token).equals("ADMIN"))
			{
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is unauthorized to view the orders !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(orderService.viewOrders());
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
	

