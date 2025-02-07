package com.payment.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payment.entity.Transaction;
import com.payment.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	TransactionRepository transactionRepo;
	
	@Override
	public void addTransaction(Transaction transaction) {
		transactionRepo.save(transaction);
	}

	@Override
	public List<Transaction> getAllTransactions() {
		return transactionRepo.findAll();
	}

	@Override
	public Transaction getTransactionById(long id) {
		return transactionRepo.findById(id).orElseThrow();
	}

	@Override
	public void deleteTransaction(long id) {
		transactionRepo.deleteById(id);
	}

	@Override
	public Transaction updateTransaction(Long id, Transaction updatedTransaction) {
		 Optional<Transaction> existingTransaction = transactionRepo.findById(id);
	        if (existingTransaction.isPresent()) {
	            Transaction transaction = existingTransaction.get();
	            transaction.setUserId(updatedTransaction.getUserId());
	            transaction.setCardNo(updatedTransaction.getCardNo());
	            transaction.setTransactionAmount(updatedTransaction.getTransactionAmount());
	            transaction.setTransactionDate(updatedTransaction.getTransactionDate());
	            return transactionRepo.save(transaction);
	        }
	        return null;
	}
	
	

}
