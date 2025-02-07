package com.example.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.UserToken;
import com.example.service.AuthService;


@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        UserToken user = authService.validateUser(request.get("email"), request.get("password"));

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String sessionToken = authService.createSessionToken(user);
        return ResponseEntity.ok(Collections.singletonMap("sessionToken", sessionToken));
    }
    
    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@RequestParam String token) {
    	authService.deleteSessionToken(token);
        return ResponseEntity.ok("logout successful");
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        int userId = authService.isValidSession(token);
        return ResponseEntity.ok(Collections.singletonMap("userId", userId));
    }
}
