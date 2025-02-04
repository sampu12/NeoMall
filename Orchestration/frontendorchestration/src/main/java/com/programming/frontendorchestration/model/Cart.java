package com.programming.frontendorchestration.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	private int id;

	private int userId;

	private List<Product> products = new ArrayList<>();
}
