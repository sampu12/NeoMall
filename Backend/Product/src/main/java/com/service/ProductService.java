package com.service;


import java.util.List;
import java.util.Optional;

import com.model.Product;
import com.model.ProductId;


public interface ProductService {
    Product createProduct(Product product);
    List<Product> getAllProducts();
    Optional<Product> getProductById(ProductId productId);
    Product updateProduct(ProductId productId, Product product);
    void deleteProduct(ProductId productId);
	void deleteProductsByCategoryId(int id);
	 public List<Product> searchByNameStartingWith(String name);
}

