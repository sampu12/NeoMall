package com.example.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.exception.UserNotFoundException;
import com.example.model.Address;
import com.example.model.Users;
import com.example.repo.AddressRepo;
import com.example.repo.UsersRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	UsersRepository usersRepo;
	
	@Autowired
	AddressRepo addressRepo;
	
	@PersistenceContext
	private EntityManager entityManager;
	@Override
	@Transactional
	public Users createUser(Users users) {
	    if (users.getUser_id() != 0) {  // Check if it's already an existing user
	        users = entityManager.merge(users);  // Reattach detached user
	    }

	    return usersRepo.save(users);  // Persist or merge the user entity
	}



	@Override
	public Users getUserById(int user_id) {
		Optional<Users> userOptional = usersRepo.findById(user_id);
		try {
		Users users = userOptional.orElseThrow(()-> new UserNotFoundException("user not found"));
			return users;
		}catch (UserNotFoundException e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}

	@Override
	public Users getUserByEmail(String email) {
		Users user = usersRepo.getUserByEmail(email);
		return user;
	}

	@Override
	public boolean deleteUser(int user_id) {
		Optional<Users> userOptional = usersRepo.findById(user_id);
		try {
		Users users = userOptional.orElseThrow(()-> new UserNotFoundException("user not found"));
			usersRepo.delete(users);
			return true;
		}catch (UserNotFoundException e) {
			System.out.println(e.getMessage());
		}
		return false;
	}

}
