package com.example.service;

import java.util.List;
import java.util.Optional;

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
	    if (users.getUser_id() != 0) {  
	        users = entityManager.merge(users); 
	    }

	    return usersRepo.save(users); 
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
		Optional<Users> userOptional = usersRepo.getUserByEmail(email);	
		try {
			Users users = userOptional.orElseThrow(()-> new UserNotFoundException("user not found"));
			return users;
		}catch (UserNotFoundException e) {
			System.out.println(e.getMessage());
		}
		return null;
	}
	
	@Override
	@Transactional
	public Users updateUserById(int user_id, Users updatedUser) {
	    Optional<Users> userOptional = usersRepo.findById(user_id);
	    Users existingUser;
	    try {
	        existingUser = userOptional.orElseThrow(() -> new UserNotFoundException("User not found"));

	        if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
	        if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
	        if (updatedUser.getPassword() != null) existingUser.setPassword(updatedUser.getPassword());
	        if (updatedUser.getMobile_number() != null) existingUser.setMobile_number(updatedUser.getMobile_number());

	        if (updatedUser.getAddresses() != null) {
	            existingUser.getAddresses().clear();
	            for (Address address : updatedUser.getAddresses()) {
	                address.setUser(existingUser);
	                existingUser.getAddresses().add(address);
	            }
	        }

	        if (updatedUser.getAccount() != null) {
	            existingUser.setAccount(updatedUser.getAccount());
	        }

	        return usersRepo.save(existingUser);
	    } catch (UserNotFoundException e) {
	        System.out.println(e.getMessage());
	        return null;
	    }
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

	public List<Users> getAllUsers() {
        return usersRepo.findAll();
    }

}
