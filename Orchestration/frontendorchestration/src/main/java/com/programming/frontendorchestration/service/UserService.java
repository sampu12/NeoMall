package com.programming.frontendorchestration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.programming.frontendorchestration.model.CartRequest;
import com.programming.frontendorchestration.model.User;

@Service
public class UserService {
	
	@Autowired
    private RestTemplate restTemplate;
    
    private final String User_SERVICE_URL = "http://user-service";
    
    public ResponseEntity<?> registerUser(User user) {
        String url = User_SERVICE_URL + "/users/newUser";
        return restTemplate.postForEntity(url, user, String.class);
    }

	public ResponseEntity<?> getUserById(String sToken) {
		if (sToken != null && sToken.startsWith("Bearer ")) {
			String token = sToken.substring(7);
			try {
				CartRequest cartRes = restTemplate.getForObject(User_SERVICE_URL + "/auth/validate?token=" + token, CartRequest.class);
				User  user = restTemplate.getForObject(User_SERVICE_URL + "/users/getUserByID/" + cartRes.getUserId(), User.class);
				return ResponseEntity.ok(user);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fetch failed. Please try again.");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
	}

	public ResponseEntity<?> updateUserById(String sToken,User userReq) {
		if (sToken != null && sToken.startsWith("Bearer ")) {
			String token = sToken.substring(7);
			try {
				CartRequest cartRes = restTemplate.getForObject(User_SERVICE_URL + "/auth/validate?token=" + token, CartRequest.class);
				restTemplate.put(User_SERVICE_URL + "/users/updateUser/" + cartRes.getUserId(),userReq);
				return ResponseEntity.ok("updated successfully");
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update Failed. Please try again.");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
	}

}
