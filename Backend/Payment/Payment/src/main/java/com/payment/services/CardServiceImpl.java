package com.payment.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payment.entity.Card;
import com.payment.repository.CardRepository;

@Service
public class CardServiceImpl implements CardService {

	@Autowired
	CardRepository cardRepository;
	
	@Override
	public void addNewCard(Card card) {
		cardRepository.save(card);
	}
	
	@Override
	public Card getCard(Long cardNo) {
		return cardRepository.findById(cardNo).orElseThrow();
	}
	
	@Override
	public List<Card> getAllCards(){
		return cardRepository.findAll();
	}
	
	@Override 
	public Card updateCard(Long cardNo, Card updatedCard) {
		 if (cardRepository.existsById(cardNo)) {
	            updatedCard.setCardNo(cardNo);
	            return cardRepository.save(updatedCard);
	     }
	     return null;
	}
	
	@Override
	public void deleteCard(Long cardNo) {
		cardRepository.deleteById(cardNo);
	}

}
