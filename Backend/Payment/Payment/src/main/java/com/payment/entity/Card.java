package com.payment.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "cards")
public class Card {
	
	@Id
	private long cardNo;
	
	private String cardHolderName;
	private Double balance;
	private String expiryDate;
	private int cvvNo;
	private int cardPassword;
	
	
	public Card() {
		
	}


	public Card(long cardNo, String cardHolderName, Double balance, String expiryDate, int cvvNo, int cardPassword) {
		this.cardNo = cardNo;
		this.cardHolderName = cardHolderName;
		this.balance = balance;
		this.expiryDate = expiryDate;
		this.cvvNo = cvvNo;
		this.cardPassword = cardPassword;
	}

	
	public String getCardHolderName() {
		return cardHolderName;
	}


	public void setCardHolderName(String cardHolderName) {
		this.cardHolderName = cardHolderName;
	}


	public Double getBalance() {
		return balance;
	}


	public void setBalance(Double balance) {
		this.balance = balance;
	}


	public long getCardNo() {
		return cardNo;
	}


	public void setCardNo(long cardNo) {
		this.cardNo = cardNo;
	}


	public String getExpiryDate() {
		return expiryDate;
	}


	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}


	public int getCvvNo() {
		return cvvNo;
	}


	public void setCvvNo(int cvvNo) {
		this.cvvNo = cvvNo;
	}


	public int getCardPassword() {
		return cardPassword;
	}


	public void setCardPassword(int cardPassword) {
		this.cardPassword = cardPassword;
	}
	
}
