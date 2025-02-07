package com.payment.services;

import com.payment.models.PaymentModel;

public interface PaymentService {
	
	public boolean payWithDebit(PaymentModel paymentModel);
	
}
