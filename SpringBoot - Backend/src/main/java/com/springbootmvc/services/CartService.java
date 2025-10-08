package com.springbootmvc.services;

import java.security.InvalidParameterException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.sql.exec.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.springbootmvc.entities.Cart;
import com.springbootmvc.entities.CartItem;
import com.springbootmvc.entities.Order;
import com.springbootmvc.entities.OrderItem;
import com.springbootmvc.entities.Product;
import com.springbootmvc.repositories.CartItemRepository;
import com.springbootmvc.repositories.CartRepository;
import com.springbootmvc.repositories.OrderRepository;
import com.springbootmvc.repositories.ProductRepository;
import com.springbootmvc.repositories.UserRepository;

@Component
public class CartService {
	
	@Autowired
	CartRepository cartRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	ProductRepository productRepository;
	@Autowired
	CartItemRepository cartItemRepository;
	@Autowired
	OrderRepository orderRepository;
	
	public Cart addToCart(int uid, int pid, int quantity)
	{
		Product product = productRepository.findProductById(pid);
		if(product == null)
		{
			throw new RuntimeException("Product with the given Id does not exist !!!");
		}
		
		if(quantity <= 0)
		{
			throw new InvalidParameterException("Product quantity should be greater than 0 !!!");
		}
		
		if (product.getStock() < quantity) 
		{
            throw new IllegalArgumentException("Not enough stock available !!!");
        }
		
		Cart cart = cartRepository.findByUserId(uid);
		if(cart == null)
		{
			cart = new Cart();
			cart.setUser(userRepository.findById(uid));
			cartRepository.save(cart);
		}
		
		CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), pid);
		if(cartItem == null)
		{
			cartItem = new CartItem();
			cartItem.setCart(cart);
			
			cartItem.setProductId(product.getId());
            cartItem.setProductName(product.getName());
            cartItem.setProductPrice(product.getPrice());
			cartItem.setQuantity(quantity);
			cartItem.setPrice(quantity * product.getPrice());
			
			if (cart.getCartItems() == null) {
			    cart.setCartItems(new ArrayList<>());
			}
			cart.getCartItems().add(cartItem);
		}
		else 
		{
			if((quantity + cartItem.getQuantity()) > product.getStock())
			{
				throw new InternalError("Cannot add more than available stock !!!");
			}
			cartItem.setQuantity(quantity + cartItem.getQuantity());
			cartItem.setPrice(cartItem.getQuantity() * product.getPrice());
		}
		
		cartItemRepository.save(cartItem);	
		return cartRepository.save(cart);
	}
	
	public CartItem updateCartItem(int uid, int cid, int quantity)
	{
		
		CartItem cItem = cartItemRepository.findById(cid);
		if(cItem == null)
		{
			throw new RuntimeException("Cart Item with the given Id does not exist !!!");
		}
		
		if(quantity <= 0)
		{
			throw new InvalidParameterException("Product quantity should be greater than 0 !!!");
		}
		
		Product product = productRepository.findProductById(cItem.getProductId());
		if (product == null) {
		    throw new RuntimeException("Product no longer exists !!!");
		}
		
		if(quantity > product.getStock())
		{
            throw new IllegalArgumentException("Not enough stock available !!!");
        }
		
		cItem.setQuantity(quantity);
		cItem.setPrice(quantity * cItem.getProductPrice());
		
		cartItemRepository.save(cItem);	
		return cItem;
	}
	
	public String deleteCartItem(int uid, int cid)
	{
		
		CartItem cItem = cartItemRepository.findById(cid);
		if(cItem == null)
		{
			throw new RuntimeException("Cart Item with the given Id does not exist !!!");
		}
		
		cartItemRepository.delete(cItem);
		return "Product deleted successfully from the cart !!";
	}
	
	public Cart viewCart(int uid)
	{
		
		Cart cart = cartRepository.findByUserId(uid);
		if(cart == null)
		{
			throw new RuntimeException("Cart for the given user does not exist !!!");
		}
		if(cart.getCartItems().isEmpty())
		{
			throw new IllegalArgumentException("Cart is empty !!!");
		}
		
		return cart;
	}
	
	public Order cartCheckout(int uid)
	{
		Cart cart = cartRepository.findByUserId(uid);
		if(cart == null)
		{
			throw new RuntimeException("Cart for the given user does not exist !!!");
		}
		
		List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
		if(cartItems.isEmpty())
		{
			throw new InvalidParameterException("Cart is empty, cannot checkout !!!");
		}
		
		Order order = new Order();
		order.setOdate(LocalDateTime.now());
		order.setStatus("PENDING");
		order.setUser(userRepository.findById(uid));
		
		List<OrderItem> orderItems = new ArrayList<OrderItem>();
		int amt = 0;
		
		for(CartItem cartItem : cartItems)
		{
			OrderItem orderItem = new OrderItem();
			orderItem.setPrice(cartItem.getPrice());
			orderItem.setQuantity(cartItem.getQuantity());			
			orderItem.setProductId(cartItem.getProductId());
            orderItem.setProductName(cartItem.getProductName());
            orderItem.setProductPrice(cartItem.getProductPrice());
			
			orderItem.setOrder(order);
			
			orderItems.add(orderItem);
			amt += cartItem.getPrice();
		}
		
		order.setOitems(orderItems);
		order.setAmt(amt);
		orderRepository.save(order);
		
		cartItemRepository.deleteAll(cartItems);
		cart.getCartItems().clear();
		cartRepository.save(cart);
		
		return order;
	}
	
}
