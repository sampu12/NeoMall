package com.programming.adminservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.programming.adminservice.controller",
"com.programming.adminservice.service"})
@EntityScan(basePackages = {"com.programming.adminservice.model"})
@EnableJpaRepositories(basePackages = {"com.programming.adminservice.repository"})

public class AdminServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminServiceApplication.class, args);
	}
	
}
