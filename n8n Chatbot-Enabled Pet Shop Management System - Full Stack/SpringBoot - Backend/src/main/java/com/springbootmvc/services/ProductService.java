package com.springbootmvc.services;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.springbootmvc.entities.Category;
import com.springbootmvc.entities.Product;
import com.springbootmvc.repositories.CategoryRepository;
import com.springbootmvc.repositories.ProductRepository;

@Component
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	@Autowired
	CategoryRepository categoryRepository;
	
	public List<Product> filterProductsByCategory(String category)
	{
		if(category.isBlank())
		{
			return (List<Product>)productRepository.findAll();
		}
		if(!categoryRepository.existsByNameIgnoreCase(category))
		{
			throw new RuntimeException("The given category does not exist !!!");
		}
		
		return productRepository.findByCategoryNameIgnoreCase(category);
	}
	
	public Product addProduct(Product product)
	{
		if(product.getName() == null || product.getName().isBlank() || product.getCategory() == null || product.getPrice() <=0 || product.getStock() <= 0)
		{
			throw new RuntimeException("Please enter the required parameters !!!");
		}
		
		Category category = categoryRepository.findByNameIgnoreCase(product.getCategory().getName());
		if(category == null)
		{
			throw new InvalidParameterException("The given category does not exist !!!");
		}
		
		if (productRepository.existsByNameAndCategoryName(product.getName(), product.getCategory().getName())) 
	    {
	        throw new RuntimeException("Product with same name and same category already exists !!!");
	    }
		
		category.setName(product.getCategory().getName());
		category.setDescription(category.getDescription());
		product.setCategory(category);
		return productRepository.save(product);
	}
	
	public Product updateProduct(int id, Product updateProduct) 
	{
	    Product product = productRepository.findProductById(id);
	    if(product == null)
	    {
	    	throw new RuntimeException("Product with the given Id does not exist !!!");
	    }
	    
	    if (productRepository.existsByNameAndCategoryNameAndIdNot(updateProduct.getName(), product.getCategory().getName(), id)) 
	    {
	        throw new IllegalArgumentException("Product with same name already exists in the given category");
	    }

	    if(updateProduct.getName()==null || updateProduct.getName().isBlank() || updateProduct.getPrice()<=0 || updateProduct.getStock()<0)
	    {
	    	throw new InvalidParameterException("Please enter the valid parameters !!!");
	    }
	    
	    product.setName(updateProduct.getName());
	    product.setPrice(updateProduct.getPrice());
	    product.setStock(updateProduct.getStock());
	    
	    return productRepository.save(product);
	}

	public String deleteProduct(int id)
	{
		Product product = this.productRepository.findProductById(id);
		if(product == null)
		{
			throw new RuntimeException("Product with the given Id does not exist !!!");
		}
		
		this.productRepository.delete(product);
		return "Product deleted successfully !!!";
	}
	
	public Product getProductDetails(int id)
	{
		Product product = this.productRepository.findProductById(id);
		if(product == null)
		{
			throw new RuntimeException("Product with the given Id does not exist !!!");
		}
		return product;
	}
	
	
	



}
