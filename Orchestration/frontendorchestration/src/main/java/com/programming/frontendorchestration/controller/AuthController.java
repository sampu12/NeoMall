package com.programming.frontendorchestration.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.programming.frontendorchestration.model.Auth;
import com.programming.frontendorchestration.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Auth auth) {

		return authService.loginUser(auth);
	}

	@DeleteMapping("/logout")
	public ResponseEntity<?> loginUser(HttpServletRequest request) {
		return authService.logoutUser(request);
	}
}
