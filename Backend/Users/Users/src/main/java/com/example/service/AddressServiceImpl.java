package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.exception.UserNotFoundException;
import com.example.model.Address;
import com.example.repo.AddressRepo;

@Service
public class AddressServiceImpl implements AddressService {
	
	AddressRepo addressRepo;	
	@Override
	public Address addAddress(Address address) {
		addressRepo.save(address);
		return address;
	}

	@Override
	public List<Address> getUserAddress(int user_id) {
	    List<Address> addressList = addressRepo.findByUserId(user_id);
	    if (addressList.isEmpty()) {
	        throw new UserNotFoundException("No addresses found for user");
	    }
	    return addressList;
	}


	@Override
	public boolean deleteAddress(int user_id) {
		try {
			Optional<Address> addressOptional = addressRepo.findById(user_id);
			Address address = addressOptional.orElseThrow(()->new UserNotFoundException("user not found"));
			return true;
		} catch (UserNotFoundException e) {
			System.out.println(e.getMessage());
		}
		return false;
	}

	@Override
	public boolean updateAddress(int user_id,Address address) {
		try {
			Optional<Address> optionaladdress = addressRepo.findById(user_id);
			Address add = optionaladdress.orElseThrow(()-> new UserNotFoundException("user not found"));
			add.setAddressLine1(address.getAddressLine1());
			add.setAddressLine2(address.getAddressLine2());
			add.setAddressType(address.getAddressType());
			add.setCity(address.getCity());
			add.setCountry(address.getCountry());
			add.setPostalCode(address.getPostalCode());
			add.setState(add.getState());
//			add.setUsers(address.getUsers());
			addressRepo.save(add);
			return true;
		} catch (UserNotFoundException e) {
			System.out.println(e.getMessage());
		}
		return false;
	}

}
