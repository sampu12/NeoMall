package com.service;

import com.model.Product;
import com.model.ProductId;
import com.repo.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(ProductId productId) {
        return productRepository.findById(productId);
    }

    public Product updateProduct(ProductId productId, Product updatedProduct) {
        Optional<Product> existingProduct = productRepository.findById(productId);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setImage(updatedProduct.getImage());
            product.setDescription(updatedProduct.getDescription());
            return productRepository.save(product);
        } else {
            throw new RuntimeException("Product not found with ID: " + productId);
        }
    }

    public void deleteProduct(ProductId productId) {
        productRepository.deleteById(productId);
    }

    public void deleteProductsByCategoryId(int categoryId) {
        productRepository.deleteByCategoryId(categoryId);
    }
    
    public List<Product> searchByNameStartingWith(String name) {
        return productRepository.findByNameStartingWithIgnoreCase(name);
    }
}
