package com.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payment.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

}
