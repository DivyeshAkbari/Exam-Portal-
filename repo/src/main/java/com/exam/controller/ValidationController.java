package com.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.User;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@RestController
@RequestMapping("/validate")
@CrossOrigin("*")
public class ValidationController {

	
	@Autowired
	private UserService userservice;
	
	
	@Autowired
    private UserRepository userRepository;
	
	
	//findByEmail
	
		
		
		
}
