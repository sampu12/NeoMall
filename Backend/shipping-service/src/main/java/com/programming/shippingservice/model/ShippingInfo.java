package com.programming.shippingservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ShippingInfo {
    @Id
    private String trackingNumber;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private String shippingType;
    
    @Column(nullable = false)
    private Double weight;


}
