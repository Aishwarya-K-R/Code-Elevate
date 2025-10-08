package com.springbootmvc.repositories;

import org.springframework.data.repository.CrudRepository;

import com.springbootmvc.entities.Cart;

public interface CartRepository extends CrudRepository<Cart, Integer> {
			
	public Cart findByUserId(int id);

}
