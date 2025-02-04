package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.model.Cart;
import com.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@PostMapping("/add")
	public ResponseEntity<Cart> addItemToCart(@RequestBody Cart cart) {
		return ResponseEntity.ok(cartService.addItemToCart(cart));
	}

	@DeleteMapping("/remove")
	public ResponseEntity<Cart> removeItemFromCart(@RequestParam int userId, @RequestParam String productId) {
		return ResponseEntity.ok(cartService.removeItemFromCart(userId, productId));
	}

	@PutMapping("/update-quantity")
	public ResponseEntity<Cart> updateItemQuantity(@RequestParam int userId, @RequestParam String productId,
			@RequestParam int quantity) {
		return ResponseEntity.ok(cartService.updateItemQuantity(userId, productId, quantity));
	}

	@GetMapping("/{userId}")
	public ResponseEntity<Cart> getCartDetails(@PathVariable int userId) {
		return ResponseEntity.ok(cartService.getCartDetails(userId));
	}
}
