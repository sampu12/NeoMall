package com.example.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Users;
import com.example.service.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {
	
		@Autowired
		UsersService usersService;
		
		@PostMapping("/newUser")
		public Users newUser(@RequestBody Users users) {
			return usersService.createUser(users);
		}
		
		@GetMapping("/getUserByID/{id}")
		public Users getUserById(@PathVariable ("id") int user_id) {
			return usersService.getUserById(user_id);
		}
		

		@GetMapping("/getUserByEmail/{email}")
		public Users getUserByEmail(@PathVariable ("email") String email) {
		    return usersService.getUserByEmail(email);
		}

		// Get all users
	    @GetMapping("/getAllUsers")
	    public List<Users> getAllUsers() {
	        List<Users> users = usersService.getAllUsers();
	        return (users);
	    }
		
		@PutMapping("/updateUser/{id}")
		public Users updateUserById(@PathVariable("id") int user_id, @RequestBody Users updatedUser) {
		    return usersService.updateUserById(user_id, updatedUser);
		}


		
		@DeleteMapping("deleteUser/{id}")
		public boolean deleteUser(@PathVariable ("id") int user_id) {
			return usersService.deleteUser(user_id);
		}
}
