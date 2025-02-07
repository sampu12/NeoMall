package com.example.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.Address;

@Repository
public interface AddressRepo extends JpaRepository<Address, Integer> {

	@Query("SELECT a FROM Address a WHERE a.user.id = :userId")
	List<Address> findByUserId(@Param("userId") int userId);



}
