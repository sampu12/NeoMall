package com.example.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.UserToken;

@Repository
public interface AuthRepository extends JpaRepository<UserToken, String> {
	Optional<UserToken> findByEmail(String email);
	Optional<UserToken> findBySessionToken(String sessionToken);
	int deleteBySessionToken(String sessionToken);
}
