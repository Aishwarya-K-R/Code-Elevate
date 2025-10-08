package com.springbootmvc.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootmvc.entities.Category;
import com.springbootmvc.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	public boolean existsByNameAndCategoryNameAndIdNot(String name, String category, int id);
	
	public Category findById(int id);
	
	public List<Product> findByCategoryNameIgnoreCase(String category);
	
	public Product findProductById(int id);

	public boolean existsByNameAndCategoryName(String name, String cname);
}
