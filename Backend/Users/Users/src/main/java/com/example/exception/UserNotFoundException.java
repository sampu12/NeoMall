package com.example.exception;

public class UserNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;
		String msg;
		public UserNotFoundException(String msg) {
			super(msg);
		}
}
