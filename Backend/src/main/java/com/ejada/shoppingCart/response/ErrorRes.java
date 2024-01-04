package com.ejada.shoppingCart.response;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorRes {
	private boolean status;
	private HttpStatus httpStatus;
	private String message;
}