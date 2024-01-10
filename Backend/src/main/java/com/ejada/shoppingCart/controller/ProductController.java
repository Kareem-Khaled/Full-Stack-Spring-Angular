package com.ejada.shoppingCart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ejada.shoppingCart.dao.ProductCategoryRepository;
import com.ejada.shoppingCart.dao.ProductRepository;
import com.ejada.shoppingCart.entity.Product;
import com.ejada.shoppingCart.entity.ProductCategory;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("${spring.data.rest.base-path}/products")
@CrossOrigin(value = "http://localhost:4200")
public class ProductController {
	
    @Autowired
    private ProductRepository productDao;
    
    @Autowired
    private ProductCategoryRepository ProductCategoryDao;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
    	long categoryId = product.getCategory().getId();
        ProductCategory category = ProductCategoryDao.getReferenceById(categoryId);
        category.getProducts().add(product);        
        productDao.save(product);
        return ResponseEntity.ok(product);
    }

//    @GetMapping("/")
//    public ResponseEntity<List<Product>> getAllProducts() {
//        List<Product> products = productDao.findAllWithCategory();
//        return ResponseEntity.ok(products);
//    }

}
