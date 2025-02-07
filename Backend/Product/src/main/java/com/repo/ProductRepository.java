package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Product;
import com.model.ProductId;

@Repository
public interface ProductRepository extends JpaRepository<Product, ProductId>{

	void deleteByCategoryId(int categoryId);
	 List<Product> findByNameStartingWithIgnoreCase(String name);
}
