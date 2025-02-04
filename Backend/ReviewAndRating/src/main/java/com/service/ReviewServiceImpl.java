package com.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Reviews;
import com.repo.ReviewRepository;

import java.util.List;
import java.util.OptionalDouble;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public Reviews addReview(Reviews review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Reviews> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId);
    }
    @Override
    public double getAverageRating(Long productId) {
        List<Reviews> reviews = reviewRepository.findByProductId(productId);

        if (reviews.isEmpty()) {
            return 0.0; // Return 0.0 if no reviews are present
        }

        OptionalDouble average = reviews.stream()
                                        .mapToInt(Reviews::getRating)
                                        .average();

        return average.isPresent() ? average.getAsDouble() : 0.0;
    }

}

