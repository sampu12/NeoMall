package com.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.model.Cart;
import com.model.CartRequest;
import com.model.Product;
import com.model.ProductId;
import com.repo.CartRepository;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;

	@Override
	@Transactional
	public Cart addItemToCart(CartRequest cartRequest) {
		Cart existingCart = cartRepository.findById(cartRequest.getUserId()).orElse(new Cart());
		existingCart.setUserId(cartRequest.getUserId());

		List<Product> productList = existingCart.getProducts();
		if (productList == null) {
			productList = new ArrayList<>();
		}

		ProductId productId = cartRequest.getProductId();

		// Check if product already exists in the cart
		boolean productExists = productList.stream().anyMatch(product -> product.getProductId().equals(productId));

		if (productExists) {
			productList.forEach(product -> {
				if (product.getProductId().equals(productId)) {
					product.setQuantity(product.getQuantity() + cartRequest.getQuantity());
				}
			});
		} else {
			Product newProduct = new Product();
			newProduct.setProductId(productId);
			newProduct.setQuantity(cartRequest.getQuantity());
			productList.add(newProduct);
		}

		existingCart.setProducts(productList);
		return cartRepository.save(existingCart);
	}

	@Override
	public Cart removeItemFromCart(int userId, ProductId productId) {
		Cart cart = cartRepository.findById(userId).orElse(null);
		if (cart == null) {
			throw new RuntimeException("Cart not found for user: " + userId);
		}

		cart.getProducts().removeIf(product -> product.getProductId().equals(productId));
		return cartRepository.save(cart);
	}

	@Override
	public Cart updateItemQuantity(CartRequest cartRequest) {
		Cart cart = cartRepository.findById(cartRequest.getUserId()).orElse(null);
		if (cart == null) {
			throw new RuntimeException("Cart not found for user: " + cartRequest.getUserId());
		}

		for (Product product : cart.getProducts()) {
			if (product.getProductId().equals(cartRequest.getProductId())) {
				product.setQuantity(cartRequest.getQuantity());
				break;
			}
		}

		return cartRepository.save(cart);
	}

	@Override
	public List<Product> getCartItems(int userId) {
		Cart cart = cartRepository.findById(userId).orElse(null);
		if (cart == null) {
			throw new RuntimeException("Cart not found for user: " + userId);
		}
		return cart.getProducts();
	}

	@Override
	@Transactional
	public String removeCart(int userId) {
	    Cart cart = cartRepository.findById(userId).orElse(null);
	    if (cart == null) {
	        throw new RuntimeException("Cart not found for user: " + userId);
	    }

	    // Clear products to ensure they are removed from the relationship
	    cart.getProducts().clear();

	    // Delete the cart from the repository
	    cartRepository.delete(cart);

	    return "Cart successfully removed for user: " + userId;
	}



}
