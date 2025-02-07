package com.programming.orderservice.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.programming.orderservice.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	Collection<Order> findByUserId(Long userId);

}
