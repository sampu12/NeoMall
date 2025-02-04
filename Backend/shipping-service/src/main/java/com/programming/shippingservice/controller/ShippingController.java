package com.programming.shippingservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.programming.shippingservice.model.ShippingInfo;
import com.programming.shippingservice.service.ShippingService;

@RestController
@RequestMapping("/api/shipping")
public class ShippingController {

    @Autowired
    private ShippingService shippingService;

    @PostMapping("/create")
    public ShippingInfo createShippingOrder(@RequestBody ShippingInfo shippingInfo) {
        return shippingService.createShippingOrder(shippingInfo);
    }

    @GetMapping("/cost")
    public double calculateShippingCost(@RequestBody ShippingInfo shippingInfo) {
        return shippingService.calculateShippingCost(shippingInfo);
    }

    @GetMapping("/status/{trackingNumber}")
    public ShippingInfo getShippingStatus(@PathVariable String trackingNumber) {
        return shippingService.getShippingInfo(trackingNumber);
    }
}
