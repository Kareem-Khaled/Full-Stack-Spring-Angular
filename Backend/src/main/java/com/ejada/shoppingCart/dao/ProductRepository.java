package com.ejada.shoppingCart.dao;

import com.ejada.shoppingCart.dto.ProductDto;
import com.ejada.shoppingCart.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

	Page<Product> findByCategoryId(@RequestParam("id") long id, Pageable pageable);
	    
	Page<Product> findByNameContainingIgnoreCase(@RequestParam("name") String name, Pageable pageable);

}
