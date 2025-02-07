package com.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

	@EmbeddedId
	private ProductId productId;

	private String name;
	private double price;
	private String image;
	private String description;

	@ManyToOne
	@JoinColumn(name = "categoryId", insertable = false, updatable = false)
	@JsonIgnoreProperties("products")
	private Category category;

	// Default constructor
	public Product() {
	}

	// Constructor with parameters
	public Product(ProductId productId, String name, double price, String image) {
		this.productId = productId;
		this.name = name;
		this.price = price;
		this.image = image;
	}

	// Getters and setters
	public ProductId getProductId() {
		return productId;
	}

	public void setProductId(ProductId productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
