package com.springbootmvc.entities;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	
	private int price;
	
	private int stock;
	
	@ManyToOne
	@JoinColumn(name = "cat_id")
	@JsonBackReference
	private Category category;
	
//	@OneToMany(mappedBy = "product")
//	@JsonManagedReference(value = "product_cartItems")
//	private List<CartItem> cartItems;
//	
//	@OneToMany(mappedBy = "product")
//	@JsonManagedReference(value = "product_orderItems")
//	private List<OrderItem> orderItems;

	public Product() {
		super();	
		// TODO Auto-generated constructor stub
	}

	public Product(int id, String name, int price, int stock, Category category) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.category = category;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", price=" + price + ", stock=" + stock + "]";
	}
	
}
