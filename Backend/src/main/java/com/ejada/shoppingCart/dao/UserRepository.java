package com.ejada.shoppingCart.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.ejada.shoppingCart.entity.User;

@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Long>{
	User findByEmail(@RequestParam("email") String email);
}