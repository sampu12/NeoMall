package com.example.service;

import java.util.List;

import com.example.model.Address;

public interface AddressService {
	
		public Address addAddress(Address address);
		public List<Address> getUserAddress(int user_id);
		public boolean deleteAddress(int user_id);
		public boolean updateAddress(int user_id,Address address);
}
