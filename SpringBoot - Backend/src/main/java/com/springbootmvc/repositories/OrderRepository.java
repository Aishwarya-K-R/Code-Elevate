package com.springbootmvc.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.springbootmvc.entities.Order;

public interface OrderRepository extends CrudRepository<Order, Integer> {

	public List<Order> getOrdersByUserId(int id);
	
	public Order findById(int id);
}
