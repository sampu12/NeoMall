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

import com.example.model.Address;
import com.example.service.AddressService;

@RestController
@RequestMapping("/address")
public class AddressController {

	@Autowired
	AddressService addressService;
	
	
	@PostMapping("/newAddress")
	public Address addAddress(@RequestBody Address address) {
		return addressService.addAddress(address);
	}
	
	@GetMapping("/getUserAddress/{id}")
	public List<Address> getUserAddresses(@PathVariable ("id") int user_id){
		return addressService.getUserAddress(user_id);
	}
	
	@DeleteMapping("/deleteAddress/{id}")
	public boolean deleteAddress(@PathVariable("id") int user_id) {
		return addressService.deleteAddress(user_id); 
	}
	
	@PutMapping("/updateAddress/{id}")
	public boolean updateAddress(@PathVariable("id") int user_id,@RequestBody Address address) {
		return addressService.updateAddress(user_id,address);
	}
}
