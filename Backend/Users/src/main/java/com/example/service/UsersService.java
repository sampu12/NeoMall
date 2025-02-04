package com.example.service;
	
import java.util.UUID;

import com.example.model.Users;

public interface UsersService {
	
		public Users createUser(Users users);
		public Users getUserById(int user_id);
		public Users getUserByEmail(String email);
		public boolean deleteUser(int user_id);
}
