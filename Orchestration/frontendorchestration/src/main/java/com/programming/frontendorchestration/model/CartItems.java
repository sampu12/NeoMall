package com.programming.frontendorchestration.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItems {
	private ProductId productId;
	private int quantity;
}
