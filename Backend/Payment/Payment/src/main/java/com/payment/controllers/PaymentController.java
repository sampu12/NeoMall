package com.payment.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payment.entity.Transaction;
import com.payment.models.PaymentModel;
import com.payment.services.PaymentService;
import com.payment.services.TransactionService;

@RestController
@RequestMapping("/payment")
public class PaymentController {
	@Autowired
	PaymentService paymentService;
	
	@Autowired
	TransactionService transactionService;
	
	@PostMapping("/payWithDebit")
	public void payWithDebit(@RequestBody PaymentModel paymentModel) {
		paymentService.payWithDebit(paymentModel);
	}
	
	@GetMapping("/getTransactions")
	public List<Transaction> getAllTransactions(){
		return transactionService.getAllTransactions();
	}
	
	@GetMapping("/getTransactionById/{id}")
	public Transaction getTransactionById(@PathVariable long id) {
		return transactionService.getTransactionById(id);
	}
	
	@DeleteMapping("/deleteTransaction/{id}")
	public ResponseEntity<Void> deleteTransaction(@PathVariable long id) {
		 transactionService.deleteTransaction(id);
		 return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/updateTransaction/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction updatedTransaction) {
        return transactionService.updateTransaction(id, updatedTransaction);
    }
	
	
}
