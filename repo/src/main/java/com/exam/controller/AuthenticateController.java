package com.exam.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.config.JwtUtils;
import com.exam.entity.JwtRequest;
import com.exam.entity.JwtResponse;
import com.exam.entity.User;
import com.exam.service.impl.UserDetailsServiceImpl;
import com.exam.service.impl.UserServiceImpl;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

	@Autowired
	private AuthenticationManager a1;
	
	@Autowired
	private UserDetailsServiceImpl userdetails;
	
	@Autowired
	private JwtUtils utils;
	
	@Autowired
	private UserServiceImpl userService;
	
	
	//generate token
	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest request) throws Exception
	{	
		
		User user = userService.checkingUserStatus(request.getUsername(),true);
		if(user.isEnabled()==true)
		{
			try
			{ 
				a1.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
				//authenticate(request.getUsername(), request.getPassword());
			}
			catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong credentials");
			}
			
			UserDetails loadUserByUsername = userdetails.loadUserByUsername(request.getUsername());
			System.out.println("user details");
			System.out.println("user name "+loadUserByUsername.getUsername());
			System.out.println("password "+loadUserByUsername.getPassword());
			
			String generateToken = utils.generateToken(loadUserByUsername);
			
			
			return ResponseEntity.ok(new JwtResponse(generateToken));
		}
		else
		{
			return ResponseEntity.ok("Valid User");
		}
	}
	
//	private void authenticate(String userName,String password) throws Exception
//	{
//		try {
//			System.out.println("user name is "+userName);
//			System.out.println("password is "+password);
//			
//			
//		}
//		catch (DisabledException e) {
//			// TODO: handle exception
//			e.getMessage();
//			throw new Exception("User Disabled");
//		}
//		catch(BadCredentialsException e)
//		{
//			e.getMessage();
//			throw new Exception("invalid credential");
//		}
//	}
	
	
	//returns the details of current user
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal)
	{
		System.out.println("Current user is "+principal.getName());
		return (User) this.userdetails.loadUserByUsername(principal.getName());
	}
}
