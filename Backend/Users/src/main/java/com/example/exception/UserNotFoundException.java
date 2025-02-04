package com.example.exception;

public class UserNotFoundException extends RuntimeException {

		String msg;
		public UserNotFoundException(String msg) {
			super(msg);
		}
}
