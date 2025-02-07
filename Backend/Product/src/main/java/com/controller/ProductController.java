package com.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.model.Category;
import com.model.Product;
import com.model.ProductId;
import com.service.CategoryServiceImpl;
import com.service.ProductServiceImpl;


@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;
    
    @Autowired
    private CategoryServiceImpl categoryService;

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        // Ensure productId is set properly
        if (product.getProductId() == null || product.getProductId().getCategoryId() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Retrieve the category as an Optional
        Optional<Category> categoryOptional = categoryService.getCategoryById(product.getProductId().getCategoryId());

        // Check if category is present
        if (categoryOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Category not found
        }

        // Set the category on the product
        product.setCategory(categoryOptional.get());

        // Save the product
        Product savedProduct = productService.createProduct(product);

        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }



    @GetMapping("/getAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/get/{categoryId}/{productId}")
    public ResponseEntity<Optional<Product>> getProductById(@PathVariable("categoryId") int categoryId, @PathVariable("productId") int productId) {
        ProductId id = new ProductId(productId,categoryId);
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PutMapping("/update/{categoryId}/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable int categoryId, @PathVariable int productId, @RequestBody Product product) {
    	ProductId id = new ProductId(productId, categoryId);
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/delete/{categoryId}/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int categoryId, @PathVariable int productId) {
        ProductId id = new ProductId( productId, categoryId);
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Product>> search(@RequestParam String query) {
        // Call service to fetch products whose names start with the provided string
        List<Product> products = productService.searchByNameStartingWith(query);

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();  // Return 204 if no products are found
        }

        return ResponseEntity.ok(products);  // Return 200 with product list
    }

}

