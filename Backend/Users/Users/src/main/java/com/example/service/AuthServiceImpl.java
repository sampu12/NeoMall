package com.example.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.UserToken;
import com.example.model.Users;
import com.example.repo.AuthRepository;
import com.example.repo.UsersRepository;

import jakarta.transaction.Transactional;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
    private AuthRepository authRepository;
	@Autowired
	private UsersRepository usersRepository;
	
    public UserToken validateUser(String email, String password) {
        Users users = usersRepository.getUserByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
        if (users != null) {
            UserToken userToken = new UserToken();
            userToken.setEmail(email);
            userToken.setUserId(users.getUser_id()); // Set userId
            return userToken;
        }

        return null;
    }

    public String createSessionToken(UserToken userToken) {
        String token = UUID.randomUUID().toString();
        long expirationTime = System.currentTimeMillis() + 1000 * 60 * 60;
        userToken.setSessionToken(token);
        userToken.setTokenExpiration(expirationTime);
        authRepository.save(userToken);
        return token; // Return both token and userId
    }


    public Integer isValidSession(String token) {
        Optional<UserToken> optionalUser = authRepository.findBySessionToken(token);
        if (optionalUser.isPresent()) {
            UserToken userToken = optionalUser.get();
            if (System.currentTimeMillis() > userToken.getTokenExpiration()) {
                return null;
            }
            return userToken.getUserId(); // Return userId if session is valid
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteSessionToken(String token) {
        int rowsDeleted = authRepository.deleteBySessionToken(token);
        
        if (rowsDeleted == 0) {
            throw new RuntimeException("Invalid session token or already logged out.");
        }
    }

}
