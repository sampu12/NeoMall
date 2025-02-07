package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usertoken")
public class UserToken {
	@Id
	private String email;
	private String sessionToken;
	private Long tokenExpiration;
	private int userId;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSessionToken() {
		return sessionToken;
	}

	public void setSessionToken(String sessionToken) {
		this.sessionToken = sessionToken;
	}

	public Long getTokenExpiration() {
		return tokenExpiration;
	}

	public void setTokenExpiration(Long tokenExpiration) {
		this.tokenExpiration = tokenExpiration;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

}