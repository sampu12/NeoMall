package com.payment.services;

import java.util.List;

import com.payment.entity.Transaction;

public interface TransactionService {
	
	public void addTransaction(Transaction transaction);

	public List<Transaction> getAllTransactions();

	public Transaction getTransactionById(long id);

	public void deleteTransaction(long id);

	public Transaction updateTransaction(Long id, Transaction updatedTransaction);
}
