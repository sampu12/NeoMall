package com.payment.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payment.entity.Card;
import com.payment.services.CardService;

@RestController
@RequestMapping("/card")
public class CardController {

	@Autowired
	CardService cardService;
	   
	@GetMapping("/getCard/{cardNo}")
	public Card getCard(Long cardNo) {	
		return cardService.getCard(cardNo);
	}	
	
	@GetMapping("/getAllCards")
	public List<Card> getAllCards(){
		return cardService.getAllCards();
	}
	
	@PostMapping("/addCard")
	public void addNewCard(@RequestBody Card card) {
		cardService.addNewCard(card);
	}
	
	@PutMapping("/updateCard/{cardNo}")
	public Card updateCard(@PathVariable Long cardNo, @RequestBody Card updatedCard) {
		return cardService.updateCard(cardNo,updatedCard);
	}
	
	@DeleteMapping("/deleteCard/{cardNo}")
	public void deleteCatd(@PathVariable Long cardNo) {
		cardService.deleteCard(cardNo);
	}
	
	
	
}
