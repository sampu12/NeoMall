package com.programming.frontendorchestration.model;


import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String email;
    private String password;
    private String name;
	private String mobile_number;

	private List<Address> addresses = new ArrayList<>();
	private Account account;
}
