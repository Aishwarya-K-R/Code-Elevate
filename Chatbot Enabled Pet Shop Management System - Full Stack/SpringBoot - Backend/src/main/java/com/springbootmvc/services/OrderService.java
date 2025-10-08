package com.springbootmvc.services;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.springbootmvc.entities.Order;
import com.springbootmvc.entities.OrderItem;
import com.springbootmvc.entities.Product;
import com.springbootmvc.entities.User;
import com.springbootmvc.repositories.OrderRepository;
import com.springbootmvc.repositories.ProductRepository;
import com.springbootmvc.repositories.UserRepository;

@Component
public class OrderService {	
	
	@Autowired
	OrderRepository orderRepository;
	@Autowired
	ProductRepository productRepository;
	@Autowired
	UserRepository userRepository;
	
	public Order confirmOrder(int oid)
	{
		Order order = orderRepository.findById(oid);
		
		if(!order.getStatus().equals("PENDING"))
		{
			throw new RuntimeException("Only pending orders can be confirmed !!!");
		}
		
		for (OrderItem oitem : order.getOitems()) 
		{
	        Product product = productRepository.findProductById(oitem.getProductId());
	        if (product.getStock() < oitem.getQuantity()) 
	        {
	            throw new InvalidParameterException("Insufficient stock for product : " + product.getName());
	        }
	        
	        product.setStock(product.getStock() - oitem.getQuantity());
			productRepository.save(product);
	    }
		
		order.setStatus("CONFIRMED");
		orderRepository.save(order);
		return order;
	}
	
	public Order cancelOrder(int oid)
	{
		Order order = orderRepository.findById(oid);
		if(!order.getStatus().equals("PENDING"))
		{
			throw new RuntimeException("Only pending orders can be cancelled !!!");
		}
		
		order.setStatus("CANCELLED");
		return(orderRepository.save(order));
	}
	
	public List<Order> viewOrderDetails(int uid)
	{
		List<Order> orders = orderRepository.getOrdersByUserId(uid);
		if(orders.isEmpty())
		{
			throw new RuntimeException("User has no associated orders !!!");
		}
		
		return orders;
	}
	
	public List<Order> viewOrders()
	{
		List<Order> orders = (List<Order>)orderRepository.findAll();
		if(orders.isEmpty())
		{
			throw new RuntimeException("No orders found !!!");
		}
	
		return orders;
	}
	
}
