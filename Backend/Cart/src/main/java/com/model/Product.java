package com.model;

import jakarta.persistence.*;

@Entity

public class Product {
	@EmbeddedId
	private ProductId productId;
	private int quantity;

	public Product() {

	}

	public ProductId getProductId() {
		return productId;
	}

	public void setProductId(ProductId productId) {
		this.productId = productId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
