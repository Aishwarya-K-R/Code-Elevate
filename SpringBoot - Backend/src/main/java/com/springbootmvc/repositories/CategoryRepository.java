package com.springbootmvc.repositories;

import org.springframework.data.repository.CrudRepository;

import com.springbootmvc.entities.Category;

public interface CategoryRepository extends CrudRepository<Category, Integer>{
	
	public boolean existsByNameIgnoreCase(String category);
	
	public Category findById(int cid);
	
	public Category findByNameIgnoreCase(String category);
	
}
