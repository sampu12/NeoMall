package com.programming.orderservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.programming.orderservice.dto.OrderRequest;
import com.programming.orderservice.dto.OrderResponse;
import com.programming.orderservice.dto.ProductDto;
import com.programming.orderservice.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/order")
@RequiredArgsConstructor
public class OrderController {
	private final OrderService orderService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public String placeOrder(@RequestBody OrderRequest orderRequest) {
		orderService.placeOrder(orderRequest);
		return "Order Placed Successfully";
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<OrderResponse> getAllOrders() {
		return orderService.getAllOrders();
	}

	@GetMapping("/user/{userId}")
	@ResponseStatus(HttpStatus.OK)
	public List<ProductDto> getAllOrderItemsByUserId(@PathVariable Long userId) {
		return orderService.getAllProductsByUserId(userId);
	}
	
	@GetMapping("/search")
	
    public ResponseEntity<List<OrderResponse>> searchOrders(@RequestParam String query) {
        List<OrderResponse> orders = orderService.searchOrders(query);

        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(orders);
    }
}
