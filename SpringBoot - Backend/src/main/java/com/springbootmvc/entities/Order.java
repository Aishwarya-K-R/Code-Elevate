package com.springbootmvc.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "uid")
	@JsonIgnoreProperties("orders")
	private User user;
	
	private int amt;
	
	@JsonIgnore
	private LocalDateTime odate;
	
	private String status;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<OrderItem> oitems;
	

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Order(int id, User user, int amt, LocalDateTime odate, String status, List<OrderItem> oitems) {
		super();
		this.id = id;
		this.user = user;
		this.amt = amt;
		this.odate = odate;
		this.status = status;
		this.oitems = oitems;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public int getAmt() {
		return amt;
	}


	public void setAmt(int amt) {
		this.amt = amt;
	}


	public LocalDateTime getOdate() {
		return odate;
	}


	public void setOdate(LocalDateTime odate) {
		this.odate = odate;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public List<OrderItem> getOitems() {
		return oitems;
	}


	public void setOitems(List<OrderItem> oitems) {
		this.oitems = oitems;
	}


	@Override
	public String toString() {
		return "Order [id=" + id + ", amt=" + amt + ", odate=" + odate + ", status=" + status + "]";
	}

}
	