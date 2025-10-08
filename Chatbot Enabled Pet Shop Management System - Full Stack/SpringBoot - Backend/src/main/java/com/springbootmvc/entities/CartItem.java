package com.springbootmvc.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "cid")
	@JsonBackReference
	private Cart cart;
	
	private int quantity;
	
	private int price;
	
//	@ManyToOne
//	@JoinColumn(name = "pid")
//	@JsonBackReference(value = "product_cartItems")
//	private Product product;
	
    private int productId;        
    private String productName;
    private int productPrice;

	public CartItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartItem(int id, Cart cart, int quantity, int price, int productId, String productName, int productPrice) {
		super();
		this.id = id;
		this.cart = cart;
		this.quantity = quantity;
		this.price = price;
		this.productId = productId;
		this.productName = productName;
		this.productPrice = productPrice;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}

	@Override
	public String toString() {
		return "CartItem [id=" + id + ", quantity=" + quantity + ", price=" + price + ", productId=" + productId
				+ ", productName=" + productName + ", productPrice=" + productPrice + "]";
	}

}
