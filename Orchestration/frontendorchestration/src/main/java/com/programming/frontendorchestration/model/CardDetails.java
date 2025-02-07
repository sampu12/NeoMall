package com.programming.frontendorchestration.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardDetails {
	private long cardNumber;
	private String expiryDate;
	private int cvv;
}
