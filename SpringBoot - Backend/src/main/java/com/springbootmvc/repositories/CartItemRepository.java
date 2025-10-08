package com.springbootmvc.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.springbootmvc.entities.CartItem;

public interface CartItemRepository extends CrudRepository<CartItem, Integer> {

	public CartItem findByCartIdAndProductId(int id, int pid);
	
	public CartItem findById(int cid);

	public List<CartItem> findByCartId(int cid);
}
