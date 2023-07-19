package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	//creating user
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		// TODO Auto-generated method stub
		
		User user1=userRepo.findByUsername(user.getUsername());
		
		if(user1!=null)
		{
			System.out.println("user is alredy there");
			throw new Exception("User already present");
		}
		else
		{
			//user create 
			for(UserRole ur:userRoles)
			{
				
				roleRepo.save(ur.getRole()); 
			}
			
			user.getUserRoles().addAll(userRoles);
			String password = user.getPassword();
			String encode = encoder.encode(password);
			user.setPassword(encode);
			user.setEnabled(false);
			user1 = userRepo.save(user);
		}
		return user1;
	}


	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return userRepo.findByUsername(username);
	}


	@Override
	public void deletUser(Long id) {
		// TODO Auto-generated method stub
		 userRepo.deleteById(id);
	}


	@Override
	public void updateuser(User user, Long id) {
		user.setId(id);
		userRepo.save(user);
		
	}

	@Override
	public User checkingUserStatus(String email,boolean temp) {
		
		System.out.println("Service ");
		 return userRepo.checkingUserStatus(email,temp);
	}


	@Override
	public User findByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmailIgnoreCase(email);
	}
}
