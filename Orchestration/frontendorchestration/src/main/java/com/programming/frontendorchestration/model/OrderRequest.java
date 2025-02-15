package com.programming.frontendorchestration.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
	private int userId;  // Added userId field
	private List<Product> productsList;
}
