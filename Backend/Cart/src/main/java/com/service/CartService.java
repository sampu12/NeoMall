package com.service;

import java.util.List;

import com.model.Cart;
import com.model.CartRequest;
import com.model.Product;
import com.model.ProductId;

public interface CartService {

    Cart addItemToCart(CartRequest cartRequest);

    Cart removeItemFromCart(int userId, ProductId productId);

    List<Product> getCartItems(int userId);

	Cart updateItemQuantity(CartRequest cartRequest);

	String removeCart(int userId);
}

