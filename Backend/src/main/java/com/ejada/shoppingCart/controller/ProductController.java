package com.ejada.shoppingCart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ejada.shoppingCart.dao.ProductCategoryRepository;
import com.ejada.shoppingCart.dao.ProductRepository;
import com.ejada.shoppingCart.dto.ProductDto;
import com.ejada.shoppingCart.dto.ProductMapper;
import com.ejada.shoppingCart.entity.Product;
import com.ejada.shoppingCart.entity.ProductCategory;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("${spring.data.rest.base-path}/products/custom")
@CrossOrigin(value = "http://localhost:4200")
public class ProductController {
	
    @Autowired
    private ProductRepository productDao;
    
    @Autowired
    private ProductCategoryRepository ProductCategoryDao;
    
    @Autowired
    private ProductMapper productMapper;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ProductDto> saveProduct(@RequestBody ProductDto productDto) {
    	Product product = productMapper.convertToEntity(productDto);
    	if(productDto.getId() > 0) {
    		Product temp = productDao.getReferenceById(productDto.getId());
    		product.setDateCreated(temp.getDateCreated());
    	}
    	long categoryId = productDto.getCategoryId();
        ProductCategory category = ProductCategoryDao.getReferenceById(categoryId);
        product.setCategory(category);
        productDto = productMapper.convertToDto(productDao.save(product));
        return ResponseEntity.ok(productDto);
    }
    
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> getProductDtoById(@PathVariable long productId) {
    	System.out.println(productId);
		Product product = productDao.getReferenceById(productId);
        return ResponseEntity.ok(productMapper.convertToDto(product));
    }
   
//    @PutMapping("/add")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto productDto) {
//    	Product product = productDao.getReferenceById(productDto.getId());
//    	long categoryId = productDto.getCategoryId();
//        ProductCategory category = ProductCategoryDao.getReferenceById(categoryId);
//        product.setCategory(category);
//        productDto = productMapper.convertToDto(productDao.save(product));
//        return ResponseEntity.ok(productDto);
//    }
//    @GetMapping("/")
//    public ResponseEntity<List<Product>> getAllProducts() {
//        List<Product> products = productDao.findAllWithCategory();
//        return ResponseEntity.ok(products);
//    }

}
