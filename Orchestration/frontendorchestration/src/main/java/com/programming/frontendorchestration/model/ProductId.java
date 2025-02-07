package com.programming.frontendorchestration.model;
import java.io.Serializable;

public class ProductId implements Serializable {

    private int productId;
    private int categoryId;

    // Default constructor
    public ProductId() {
    }

    // Constructor with parameters
    public ProductId(int productId, int categoryId) {
        this.productId = productId;
        this.categoryId = categoryId;
    }

    // Getters and setters
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    
}
