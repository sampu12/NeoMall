package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.model.CartRequest;
import com.model.Product;
import com.model.ProductId;
import com.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@PostMapping("/add")
	public ResponseEntity<Cart> addItemToCart(@RequestBody CartRequest cartRequest) {
		return ResponseEntity.ok(cartService.addItemToCart(cartRequest));
	}

	@DeleteMapping("/remove")
	public ResponseEntity<Cart> removeItemFromCart(@RequestParam int userId,@RequestParam int categoryId, @RequestParam int productId) {
		ProductId id = new ProductId(productId,categoryId);
		return ResponseEntity.ok(cartService.removeItemFromCart(userId, id));
	}
	
	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<?> removeItemFromCart(@PathVariable int userId) {
	    try {
	        String message = cartService.removeCart(userId);
	        return ResponseEntity.ok(message);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	    }
	}


	@PutMapping("/update-quantity")
	public ResponseEntity<Cart> updateItemQuantity(@RequestBody CartRequest cartRequest) {
		return ResponseEntity.ok(cartService.updateItemQuantity(cartRequest));
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<Product>> getCartDetails(@PathVariable int userId) {
		return ResponseEntity.ok(cartService.getCartItems(userId));
	}
}
