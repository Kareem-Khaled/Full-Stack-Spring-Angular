package com.ejada.shoppingCart.response;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRes {
	private HttpStatus status;
	private String email;
    private String token;
	private String message;
}
