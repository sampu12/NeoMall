package com.programming.shippingservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.programming.shippingservice.model.ShippingInfo;
import com.programming.shippingservice.repository.ShippingRepository;

@Service
public class ShippingServiceImpl implements ShippingService{
	@Autowired
    private ShippingRepository shippingRepository;

    public ShippingInfo createShippingOrder(ShippingInfo shippingInfo) {
        shippingInfo.setTrackingNumber("TRACK-" + System.currentTimeMillis());
        return shippingRepository.save(shippingInfo);
    }

    public double calculateShippingCost(ShippingInfo shippingInfo) {
        double baseRate = 10.0;
        double weightRate = 2.0;
        
        return baseRate + (shippingInfo.getWeight() * weightRate);
    }

    public ShippingInfo getShippingInfo(String trackingNumber) {
        return shippingRepository.findById(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Shipping order not found"));
    }
}
