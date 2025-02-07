package com.programming.orderservice.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.programming.orderservice.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	Collection<Order> findByUserId(Long userId);
	
	@Query("SELECT DISTINCT o FROM Order o WHERE o.orderNumber LIKE %:orderNumber%")
	List<Order> findByOrderNumberContaining(String orderNumber);
}
