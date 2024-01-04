package com.ejada.shoppingCart.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "product_categories2")
@Data

public class ProductCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
	private long id;
	
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="products_categories_names2", joinColumns=@JoinColumn(name="category_id"))
    @MapKeyColumn(name="language") 
    @Column(name="name") 
    private Map<String, String> name = new HashMap<>();
	
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    List<Product> products = new ArrayList<>();
}
