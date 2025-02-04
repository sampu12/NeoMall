package com.programming.shippingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.programming.shippingservice.model.ShippingInfo;

@Repository
public interface ShippingRepository extends JpaRepository<ShippingInfo, String>{

}
