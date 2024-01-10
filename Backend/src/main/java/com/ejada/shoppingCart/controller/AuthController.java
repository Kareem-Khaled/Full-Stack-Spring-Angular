package com.ejada.shoppingCart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.ejada.shoppingCart.auth.JwtUtil;
import com.ejada.shoppingCart.dao.UserRepository;
import com.ejada.shoppingCart.entity.User;
import com.ejada.shoppingCart.request.LoginReq;
import com.ejada.shoppingCart.response.LoginRes;

@RestController
@RequestMapping("/auth")
@CrossOrigin(value = "http://localhost:4200")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
    }
    
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserRepository userDao;
    
	
	@PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginReq loginReq)  {
        try {
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
			
            String email = authentication.getName();
            User user = userDao.findByEmail(email);
            String token = jwtUtil.createToken(user);
            LoginRes loginRes = new LoginRes(
        		HttpStatus.OK,
            	email,
            	token,
            	user.getRoles(),
            	"Welcome Back!"
            );

            return ResponseEntity.ok(loginRes);

        }catch (BadCredentialsException e){
            LoginRes loginRes = new LoginRes(
            		HttpStatus.NOT_FOUND,
                	null,
                	null,
                	null,
                	"Invalid username or password"
            );
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(loginRes);
        }catch (Exception e){
            LoginRes loginRes = new LoginRes(
            		HttpStatus.BAD_REQUEST,
                	null,
                	null,
                	null,
                	"Invalid username or password"
            );
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginRes);
        }
    }
    
	@PostMapping("/register")
    public ResponseEntity register(@RequestBody User user)  {
        System.out.println(user);
        user.getRoles().add("ROLE_USER");
        user = userDao.save(user);
    	return ResponseEntity.ok(user);
    }
	
	@PostMapping("/admin-register")
    public ResponseEntity adminRegister(@RequestBody User user)  {
        System.out.println(user);
        user.getRoles().add("ROLE_ADMIN");
        user = userDao.save(user);
    	return ResponseEntity.ok(user);
    }
}