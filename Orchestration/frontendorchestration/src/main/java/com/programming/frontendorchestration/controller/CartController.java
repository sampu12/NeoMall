package com.programming.frontendorchestration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.programming.frontendorchestration.model.Product;
import com.programming.frontendorchestration.service.CartService;


@RestController
@RequestMapping("/cart")
public class CartController {
	@Autowired
    private CartService cartService;
	
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Product product) {
        
        return cartService.addToCart(product);
    }

    @GetMapping
    public List<Product> getCartItems() {
        return cartService.getCartItems();
    }
}
