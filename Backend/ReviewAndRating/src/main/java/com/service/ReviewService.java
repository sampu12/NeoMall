package com.service;

import java.util.List;
import com.model.Reviews;

public interface ReviewService {

    Reviews addReview(Reviews review);

    List<Reviews> getReviewsByProduct(Long productId);

    double getAverageRating(Long productId);
}

