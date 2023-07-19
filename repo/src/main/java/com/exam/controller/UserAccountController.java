package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.exam.entity.ConfirmationToken;
import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repo.ConfirmationTokenRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import com.exam.service.impl.EmailService;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserAccountController {

	@Autowired
	private UserService userservice;
	
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    @RequestMapping(value="/register", method = RequestMethod.GET)
    public ModelAndView displayRegistration(ModelAndView modelAndView, User userEntity)
    {
        modelAndView.addObject("userEntity", userEntity);
        modelAndView.setViewName("register");
        return modelAndView;
    }
    
    
    @PostMapping("/")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws Exception
    {

    	User existingUser = userRepository.findByEmailIgnoreCase(user.getEmail());
        if(existingUser != null)
        {
            
        }
        else
        {
        	user.setProfile("default.png");
    		Role role=new Role();
    		UserRole roles=new UserRole();
    		
    		role.setRoleid(23L);
    		role.setRoleName("NORMAL");
    		
    		Set<UserRole> userrole=new HashSet<>();
    		
    		roles.setUser(user);
    		roles.setRole(role);
    		 
    		userrole.add(roles);
    		userservice.createUser(user,userrole);
    		
            ConfirmationToken confirmationToken = new ConfirmationToken(user);

            confirmationTokenRepository.save(confirmationToken);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
            +"http://localhost:8282/user/confirm-account?token="+confirmationToken.getConfirmationToken());

            emailService.sendEmail(mailMessage);

//            modelAndView.addObject("emailId", userEntity.getEmail());
//
//            modelAndView.setViewName("successfulRegisteration");
        }

        return ResponseEntity.ok(null);
    }
    

    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<String> confirmUserAccount(@RequestParam("token")String confirmationToken)
    {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null)
        {
        	User user = userRepository.findByEmailIgnoreCase(token.getUserEntity().getEmail());
            user.setEnabled(true);
            userRepository.save(user);
            //modelAndView.setViewName("accountVerified");
        }
        else
        {
//            modelAndView.addObject("message","The link is invalid or broken!");
//            modelAndView.setViewName("error");
        }

        return ResponseEntity.ok("done");
    }
}
