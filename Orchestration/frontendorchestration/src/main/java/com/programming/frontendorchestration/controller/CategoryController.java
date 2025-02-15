package com.programming.frontendorchestration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.programming.frontendorchestration.model.Category;
import com.programming.frontendorchestration.model.Product;
import com.programming.frontendorchestration.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping
	public List<Category> getCategories() {
		return categoryService.getCategories();
	}
	
	@GetMapping("/{categoryId}")
	public List<Product> getProductsByCategoryId(@PathVariable int categoryId) {
		return categoryService.getProductsByCategoryId(categoryId);
	}
}
