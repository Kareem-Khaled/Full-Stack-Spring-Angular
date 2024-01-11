package com.ejada.shoppingCart.response;

import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRes {
	private HttpStatus status;
	private String email;
	private String username;
    private String token;
    private List<String>Roles;
	private String message;
}
