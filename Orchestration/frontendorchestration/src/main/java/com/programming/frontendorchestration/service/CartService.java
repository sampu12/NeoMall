package com.programming.frontendorchestration.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.programming.frontendorchestration.model.Cart;
import com.programming.frontendorchestration.model.Product;

@Service
public class CartService {
	
	@Autowired
    private RestTemplate restTemplate;
	private final String USER_SERVICE_URL = "http://user-service/users";
	private final String CART_SERVICE_URL = "http://cart-service/cart";
	
    public ResponseEntity<?> addToCart(Product product) {
        String url = CART_SERVICE_URL + "/add";
        return restTemplate.postForEntity(url, product, String.class);
    }

    public List<Product> getCartItems() {
    	try {
        String url = CART_SERVICE_URL + "/1";
        Cart cart = restTemplate.getForObject(url, Cart.class);
        return cart != null ? cart.getProducts() : Collections.emptyList();
        } catch (RestClientException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

}
