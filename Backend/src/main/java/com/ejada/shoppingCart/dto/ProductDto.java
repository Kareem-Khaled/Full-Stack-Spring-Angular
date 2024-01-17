package com.ejada.shoppingCart.dto;

import java.util.Date;
import java.util.Map;

import lombok.Data;

@Data
public class ProductDto {
    private long id;
    private Map<String, String> name;
    private Map<String, String> description;
    private double price;
    private long categoryId;
    private long quantity;
    private Date dateCreated;
    private Date lastUpdated;
    private String imageUrl;
   
}
