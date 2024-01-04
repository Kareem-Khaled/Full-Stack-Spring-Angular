package com.ejada.shoppingCart.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.ejada.shoppingCart.entity.Product;
import com.ejada.shoppingCart.entity.ProductCategory;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer{

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Product.class);
        config.exposeIdsFor(ProductCategory.class);
	}
	
}
