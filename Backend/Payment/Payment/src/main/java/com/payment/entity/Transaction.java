package com.payment.entity;



import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    private int userId;
    private long cardNo;
    private double transactionAmount;
    private Date transactionDate;
	public Transaction() {
		super();
	}
	public Transaction( int userId, long cardNo, double transactionAmount, Date transactionDate) {
		super();

		this.userId = userId;
		this.cardNo = cardNo;
		this.transactionAmount = transactionAmount;
		this.transactionDate = transactionDate;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public long getCardNo() {
		return cardNo;
	}
	public void setCardNo(long cardNo) {
		this.cardNo = cardNo;
	}
	public double getTransactionAmount() {
		return transactionAmount;
	}
	public void setTransactionAmount(double transactionAmount) {
		this.transactionAmount = transactionAmount;
	}
	public Date getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}
    
    
}

