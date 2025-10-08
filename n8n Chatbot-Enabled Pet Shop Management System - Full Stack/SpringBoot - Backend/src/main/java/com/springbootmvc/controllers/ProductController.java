package com.springbootmvc.controllers;

import java.security.InvalidParameterException;
import java.util.List;

import javax.management.InvalidAttributeValueException;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springbootmvc.entities.Product;
import com.springbootmvc.services.ProductService;
import com.springbootmvc.services.UserService;

@RestController
public class ProductController {
	
	@Autowired
	ProductService productService;
	@Autowired
	UserService userService;
	
	@GetMapping("/products/category")
	public ResponseEntity<?> filterProductsByCategory(@RequestHeader(value = "Authorization", required = false) String token, @RequestParam("category")String category)
	{
		try
		{
			if(token == null || token.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
			}
			
			if(!userService.validToken(token.replace("Bearer ", "")))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
			}
			
			List<Product> products = productService.filterProductsByCategory(category);
			
			if(products.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No products in the given category !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(products);
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
	
	@PostMapping("/admin/add/product")
	public ResponseEntity<?> addNewProduct(@RequestHeader(value = "Authorization", required = false) String token, @RequestBody Product product)
	{
		try
		{
			if(token == null || token.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
			}
			
			if(!userService.validToken(token.replace("Bearer ", "")))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
			}
			
			if(!userService.getRoleFromToken(token).equals("ADMIN"))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only Admins are authorized to perform this functionality !!!");
			}
			
			return ResponseEntity.status(HttpStatus.CREATED).body(productService.addProduct(product));
		}
		
		catch (InvalidParameterException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@PutMapping("/admin/update/product/{id}")
	public ResponseEntity<?> updateProduct(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("id")int id, @RequestBody Product product)
	{
		try
		{
			if(token == null || token.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
			}
			
			if(!userService.validToken(token.replace("Bearer ", "")))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
			}
			
			if(!userService.getRoleFromToken(token).equals("ADMIN"))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only Admins are authorized to perform this functionality !!!");
			}
			
			Product updateProduct = productService.updateProduct(id, product);
			
			return ResponseEntity.status(HttpStatus.OK).body(updateProduct);
		}
		
		catch (InvalidParameterException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
		}
		catch (IllegalArgumentException e) 
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
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
	
	@DeleteMapping("/admin/delete/product/{id}")
	public ResponseEntity<?> deleteProduct(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("id")int id)
	{
		try
		{
			if(token == null || token.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
			}
			
			if(!userService.validToken(token.replace("Bearer ", "")))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
			}
			
			if(!userService.getRoleFromToken(token).equalsIgnoreCase("ADMIN"))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only Admins are authorized to perform this functionality !!!");
			}
			
			String deleteProduct = productService.deleteProduct(id);
			
			return ResponseEntity.status(HttpStatus.OK).body(deleteProduct);
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
	
	@GetMapping("/product/{id}")
	public ResponseEntity<?> viewProductsById(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("id")int id)
	{
		try
		{
			if(token == null || token.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
			}
			
			if(!userService.validToken(token.replace("Bearer ", "")))
			{
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
			}
			
			Product product = productService.getProductDetails(id);
			
			return ResponseEntity.status(HttpStatus.OK).body(product);
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
