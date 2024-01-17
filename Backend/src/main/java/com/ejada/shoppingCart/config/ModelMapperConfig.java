package com.ejada.shoppingCart.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ejada.shoppingCart.dto.ProductDto;
import com.ejada.shoppingCart.entity.Product;

@Configuration
public class ModelMapperConfig {
  @Bean
  public ModelMapper modelMapper() {
      ModelMapper modelMapper = new ModelMapper();

      modelMapper.createTypeMap(Product.class, ProductDto.class)
              .addMapping(src -> src.getCategory().getId(), ProductDto::setCategoryId);

      return modelMapper;
  }
}
