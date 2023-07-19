package com.exam.controller;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.User;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import com.exam.service.impl.EmailService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userservice;
	
	
	@Autowired
    private UserRepository userRepository;
	//creating user
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PasswordEncoder encoder;
	
//	@PostMapping("/")
//	public User createUser(@RequestBody User user) throws Exception
//	{
//		user.setProfile("default.png");
//		Role role=new Role();
//		UserRole roles=new UserRole();
//		
//		role.setRoleid(23L);
//		role.setRoleName("NORMAL");
//		
//		Set<UserRole> userrole=new HashSet<>();
//		
//		roles.setUser(user);
//		roles.setRole(role);
//		 
//		userrole.add(roles);
//		return userservice.createUser(user,userrole);
//		
//	}
	
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username)
	{
		return userservice.getUser(username);
	}
	
	@DeleteMapping("/{id}")
	public void deletuser(@PathVariable("id") Long id)
	{
		userservice.deletUser(id);
	}
	
	@PutMapping("/{id}")
	public void updateUser(@RequestBody User user,@PathVariable("id") Long id)
	{
		userservice.updateuser(user,id);
	}
	
	//update password
	@PutMapping("/")
	public void UpdatePassword(@RequestBody User user)
	{
//		String encode = encoder.encode(password);
//		userRepository.changePassword(encode, email);
		
		System.out.println("email is "+user.getEmail());
		System.out.println("password is "+user.getPassword());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(user.getPassword());
        
        User findByEmailIgnoreCase = userRepository.findByEmailIgnoreCase(user.getEmail());
      
        user.setId(findByEmailIgnoreCase.getId());
        user.setPassword(encodedPassword);
        user.setEmail(findByEmailIgnoreCase.getEmail());
        user.setFirstname(findByEmailIgnoreCase.getFirstname());
        user.setLastname(findByEmailIgnoreCase.getLastname());
        user.setPhone(findByEmailIgnoreCase.getPhone());
        user.setProfile(findByEmailIgnoreCase.getProfile());
        user.setUsername(findByEmailIgnoreCase.getUsername());
        user.setEnabled(true);
        
        //  userRepository.changePassword(encodedPassword,user.getEmail());
		userRepository.save(user);
	}
	
	
	@GetMapping("/forgot/{email}")
	public ResponseEntity<User> validationUser(@PathVariable("email") String email)
	{
		System.out.println("yes");
		User user = userRepository.findByEmailIgnoreCase(email);
		System.out.println("email is "+user.getEmail());
		return ResponseEntity.ok(user);
	}
	
	@GetMapping("/sendOTP/{email}")
	public ResponseEntity<?> sendOTP(@PathVariable("email") String email)
	{
		System.out.println("SendOTP Method");
		System.out.println("Email is "+email);
		
		//generating OTP of four Digit
		
		Random random = new Random(100000);
		int OTP = random.nextInt(999999);
		System.out.println("OTP is "+OTP);
		
		
		SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("Your OTP is "+OTP);

        emailService.sendEmail(mailMessage);
        
        Map<Object,Object> map=Map.of("OTP",OTP,"email",email);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping("/Email/{email}")
	public User checkingUserNameByEmail(@PathVariable("email") String email)
	{
		 User findByEmailIgnoreCase = userservice.findByEmail(email);
		 System.out.println("email is "+findByEmailIgnoreCase.getEmail());
		 return findByEmailIgnoreCase;
	}
	
	@GetMapping("/Phone/{phone}")
	public User checkingUserByPhone(@PathVariable("phone") String phone)
	{
		return  userRepository.findByPhone(phone);
	}
}
