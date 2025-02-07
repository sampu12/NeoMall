package com.programming.frontendorchestration.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.programming.frontendorchestration.model.CartRequest;
import com.programming.frontendorchestration.model.Product;

@Service
public class OrderService {
	
	@Autowired
    private RestTemplate restTemplate;
	private final String User_SERVICE_URL = "http://user-service/auth";
	private final String ORDER_SERVICE_URL = "http://order-service/order";

	public List<Product> getOrderItems(String token) {
		CartRequest cartRes = restTemplate.getForObject(User_SERVICE_URL + "/validate?token=" + token,CartRequest.class);
		Product[] products  = restTemplate.getForObject(ORDER_SERVICE_URL + "/user/" + cartRes.getUserId(), Product[].class);
		return Arrays.asList(products);
	}

}
