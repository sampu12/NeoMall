package com.payment.services;

import java.util.List;

import com.payment.entity.Card;

public interface CardService {
	public void addNewCard(Card card);
	
	public Card getCard(Long cardNo);
	
	public List<Card> getAllCards();
	
	public Card updateCard(Long cardNo, Card UpdatedCard);
	
	public void deleteCard(Long cardNo);
}
