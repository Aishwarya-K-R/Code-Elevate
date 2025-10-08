package com.springbootmvc.controllers;

import java.security.InvalidParameterException;
import java.util.List;

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

import com.springbootmvc.entities.Category;
import com.springbootmvc.entities.Product;
import com.springbootmvc.services.CategoryService;
import com.springbootmvc.services.UserService;

@RestController
public class CategoryController {
	
	@Autowired
	UserService userService;
	@Autowired
	CategoryService categoryService;
	
	@GetMapping("/categories")
	public ResponseEntity<?> viewCategories(@RequestHeader(value = "Authorization", required = false) String token)
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
			
			return ResponseEntity.ok(categoryService.getAllCategories());
		} 
		
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@GetMapping("/category")
	public ResponseEntity<?> viewProductsByCategory(@RequestHeader(value = "Authorization", required = false)String token, @RequestParam("category")String category)
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
			
			List<Product> products = categoryService.getAllProductsByCategory(category);
			if(products.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.OK).body("No categories available !!!");
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(products);
		}
	
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@PostMapping("/admin/add/category")
	public ResponseEntity<?> addCategory(@RequestHeader(value = "Authorization", required = false)String token, @RequestBody Category category)
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
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only Admins are authorized to perform this operation !!!");
			}
			
			return ResponseEntity.ok(categoryService.addCategory(category));
		}
		
		catch (InvalidParameterException e) 
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		catch (RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@PutMapping("/admin/update/category/{id}")
	public ResponseEntity<?> updateCategory(@RequestHeader(value = "Authorization", required = false)String token, @PathVariable("id")int id, @RequestBody Category category)
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
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only Admins are authorized to perform this operation !!!");
			}
			
			Category update = categoryService.updateCategory(id, category);
			return ResponseEntity.ok(update);
		}
		
		catch(NullPointerException e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		catch(InvalidParameterException e) 
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		catch(RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
	
	@DeleteMapping("/admin/delete/category/{id}")
	public ResponseEntity<?> deleteCategory(@RequestHeader(value = "Authorization", required = false)String token, @PathVariable("id")int id)
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
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only Admins are authorized to perform this operation !!!");
			}
			
			String delete = categoryService.deleteCategory(id);
			return ResponseEntity.ok(delete);
		}
		
		catch(RuntimeException e) 
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !!!");
		}
	}
}
