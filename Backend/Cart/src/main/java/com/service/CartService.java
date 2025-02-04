package com.service;

import com.model.Cart;

public interface CartService {

    Cart addItemToCart(Cart cart);

    Cart removeItemFromCart(int userId, String productId);

    Cart updateItemQuantity(int userId, String productId, int quantity);

    Cart getCartDetails(int userId);
}

