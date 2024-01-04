package com.ejada.shoppingCart.entity;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.Data;

@Entity
@Table(name = "products2")
@Data

public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;
	
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="products_names2", joinColumns=@JoinColumn(name="product_id"))
    @MapKeyColumn(name="language") 
    @Column(name="name")
    private Map<String, String> name = new HashMap<>();
	
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="products_descriptions2", joinColumns=@JoinColumn(name="product_id"))
    @MapKeyColumn(name="language") 
    @Column(name="name")
    private Map<String, String> description = new HashMap<>();
	
    @Column(name = "price")
	private double price;
	
	@ManyToOne //, referencedColumnName = "id"
    @JoinColumn(name = "category_id")
	private ProductCategory category;
	
    @Column(name = "quantity")
	private long quantity;

	@CreationTimestamp
	@Column(name = "date_created")
	private Date dateCreated;
	
	@UpdateTimestamp
	@Column(name = "last_updated")
	private Date lastUpdated;
	
	@Column(name = "image_url")
	private String imageUrl;
	
}
