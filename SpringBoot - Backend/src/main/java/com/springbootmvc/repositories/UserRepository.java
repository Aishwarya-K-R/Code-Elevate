package com.springbootmvc.repositories;

import org.springframework.data.repository.CrudRepository;

import com.springbootmvc.entities.User;

public interface UserRepository extends CrudRepository<User, Integer> {
			
	public User findByEmail(String email);

	public User findById(int id);

}
