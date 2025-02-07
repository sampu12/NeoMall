package com.programming.frontendorchestration.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	private ProductId productId;
    private String name;
    private String image;
    private int quantity;
    private String description;
    private BigDecimal price;
}

