package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.service","com.controller"})
@EnableJpaRepositories(basePackages = {"com.repo"})
@EntityScan(basePackages = {"com.model"})

public class ReviewAndRatingApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReviewAndRatingApplication.class, args);
	}

}
