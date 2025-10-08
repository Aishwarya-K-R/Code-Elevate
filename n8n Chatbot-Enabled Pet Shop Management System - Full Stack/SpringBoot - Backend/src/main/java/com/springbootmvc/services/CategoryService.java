package com.springbootmvc.services;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;
import com.springbootmvc.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springbootmvc.entities.Category;
import com.springbootmvc.entities.Product;
import com.springbootmvc.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	ProductRepository productRepository;
	
	public List<Category> getAllCategories()
	{
		List<Category> categories = (List<Category>)this.categoryRepository.findAll();
		if(categories.isEmpty())
		{
			throw new RuntimeException("No categories added !!!");
		}
		
		return categories;
	}
	
	public List<Product> getAllProductsByCategory(String category)
	{
		if(!categoryRepository.existsByNameIgnoreCase(category))
		{
			throw new RuntimeException("The given category does not exist !!!");
		}
		
		return productRepository.findByCategoryNameIgnoreCase(category);
	}
	
	public Category addCategory(Category category)
	{
		if(category.getName() == null || category.getDescription() == null || category.getName().isBlank() || category.getDescription().isBlank())
		{
			throw new RuntimeException("Please enter the required parameters !!!");
		}
		
		if(categoryRepository.existsByNameIgnoreCase(category.getName()))
		{
			throw new InvalidParameterException("Category with the given name already exists !!!");
		}
		
		List<Product> emptyList = new ArrayList<Product>();
		category.setProducts(emptyList) ;
		categoryRepository.save(category);
		
		return category;
	}
	
	public Category updateCategory(int cid, Category category)
	{
		Category category2 = categoryRepository.findById(cid);
		if(category2 == null)
		{
			throw new RuntimeException("Category with the given Id does not exist !!!");
		}
		
		if(category.getName() == null || category.getDescription() == null || category.getName().isBlank() || category.getDescription().isBlank())
		{
			throw new NullPointerException("Updation details cannot be empty !!!");
		}
		
		if(category.getName()!=null)
		{
			Category updateCategory = categoryRepository.findByNameIgnoreCase(category.getName());
			if(updateCategory != null && cid != updateCategory.getId())
			{
				throw new InvalidParameterException("Category with the given name already exists !!!");
			}
			
			category2.setName(category.getName());
		}
		
		if(category.getDescription()!=null)
		{
			category2.setDescription(category.getDescription());
		}
		
		categoryRepository.save(category2);
		return category2;
	}
	
	public String deleteCategory(int cid)
	{
		Category category = categoryRepository.findById(cid);
		if(category == null)
		{
			throw new RuntimeException("Category with the given Id does not exist !!!");
		}
		
		categoryRepository.delete(category);
		return "Category deletion successful !!";
	}
}
