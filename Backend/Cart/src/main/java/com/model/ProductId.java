package com.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class ProductId implements Serializable {

	private int productId;
	private int categoryId;

	// Default constructor
	public ProductId() {
	}

	// Constructor with parameters
	public ProductId(int productId, int categoryId) {
		this.productId = productId;
		this.categoryId = categoryId;
	}

	// Getters and setters
	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ProductId that = (ProductId) o;
		return productId == that.productId && categoryId == that.categoryId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(productId, categoryId);
	}

}
