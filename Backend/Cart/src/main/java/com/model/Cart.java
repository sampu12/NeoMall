package com.model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;


@Entity

public class Cart {
    @Id
    private int userId;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id") // Foreign key in Product table
    private List<Product> products = new ArrayList<>();

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}
    
    
}
