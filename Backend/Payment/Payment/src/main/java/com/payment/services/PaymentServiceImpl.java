package com.payment.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payment.entity.Card;
import com.payment.entity.Transaction;
import com.payment.models.PaymentModel;
import com.payment.repository.CardRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    CardRepository paymentRepo;

    @Autowired
    TransactionService transactionService;

    @Override
    public boolean payWithDebit(PaymentModel paymentModel) {
        List<Card> cards = paymentRepo.findAll();

        Iterator<Card> iterator = cards.iterator();

        while (iterator.hasNext()) {
            Card card = iterator.next();
            if (paymentModel.getCardNo() == card.getCardNo()
                && paymentModel.getCvvNo() == card.getCvvNo()
                && paymentModel.getAmount() <= card.getBalance()
                && isExpiryValid(paymentModel.getExpiryDate())) {

                Transaction transaction = new Transaction(
                        paymentModel.getUserId(),
                        paymentModel.getCardNo(),
                        paymentModel.getAmount(),
                        Date.valueOf(LocalDate.now())
                );
                transactionService.addTransaction(transaction);

                card.setBalance(card.getBalance() - paymentModel.getAmount());
                paymentRepo.save(card);
                return true;
            }
        }
        return false;
    }

    private boolean isExpiryValid(String expiryDateStr) {
        // Expected format: "MM/YY"
        if (expiryDateStr == null || !expiryDateStr.matches("^\\d{2}/\\d{2}$")) {
            throw new IllegalArgumentException("Expiry date must be in MM/YY format.");
        }

        String[] parts = expiryDateStr.split("/");
        int expiryMonth = Integer.parseInt(parts[0]);
        int expiryYear = Integer.parseInt(parts[1]) + 2000;

        if (expiryMonth < 1 || expiryMonth > 12) {
            return false;
        }

        LocalDate now = LocalDate.now();
        int currentYear = now.getYear();
        int currentMonth = now.getMonthValue();

        return (expiryYear > currentYear) || (expiryYear == currentYear && expiryMonth >= currentMonth);
    }
}
