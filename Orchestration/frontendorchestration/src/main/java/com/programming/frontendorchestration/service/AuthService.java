package com.programming.frontendorchestration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.programming.frontendorchestration.model.Auth;
import com.programming.frontendorchestration.model.CartRequest;
import com.programming.frontendorchestration.model.Session;
import com.programming.frontendorchestration.model.User;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService {
	@Autowired
	private RestTemplate restTemplate;

	private final String User_SERVICE_URL = "http://user-service";

	public ResponseEntity<?> loginUser(Auth auth) {
		String url = User_SERVICE_URL + "/auth/login";
		ResponseEntity<Session> session = restTemplate.postForEntity(url, auth, Session.class);
		CartRequest cartRes = restTemplate.getForObject(User_SERVICE_URL + "/auth/validate?token=" + session.getBody().getSessionToken(), CartRequest.class);
		User  user = restTemplate.getForObject(User_SERVICE_URL + "/users//getUserByID/" + cartRes.getUserId(), User.class);
		session.getBody().setUserName(user.getName());
		return session;
	}

	public ResponseEntity<?> logoutUser(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			String token = authHeader.substring(7);
			try {
				restTemplate.delete(User_SERVICE_URL + "/auth/logout?token=" + token);
				return ResponseEntity.ok("logout successfull");
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed. Please try again.");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
	}

}
