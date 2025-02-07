package com.example.service;

import com.example.model.UserToken;

public interface AuthService {
	public String createSessionToken(UserToken userToken);
	public Integer isValidSession(String token);
	public UserToken validateUser(String string, String string2);
	public void deleteSessionToken(String token);
}
