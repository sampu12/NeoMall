package com.programming.orderservice.repository;

import com.programming.orderservice.model.Product;
import com.programming.orderservice.model.ProductId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, ProductId> {
}
