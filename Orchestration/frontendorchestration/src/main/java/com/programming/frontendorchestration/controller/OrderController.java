package com.programming.frontendorchestration.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.programming.frontendorchestration.model.Product;
import com.programming.frontendorchestration.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
    private OrderService orderService;
	
	@GetMapping
    public List<Product> getCartItems(@RequestHeader("Authorization") String sToken) {
    	if (sToken != null && sToken.startsWith("Bearer ")) {
            String token = sToken.substring(7);

            return orderService.getOrderItems(token);
        } else {
            return new ArrayList<Product>();
        } 
    }
}
