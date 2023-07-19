package com.exam.service;

import java.util.Set;

import com.exam.entity.User;
import com.exam.entity.UserRole;

public interface UserService {

	//creting user
	
	public User createUser(User user,Set<UserRole> userRoles) throws Exception;
	
	public User getUser(String username);
	
	public void deletUser(Long id);


	public void updateuser(User user, Long id);
	

	public User checkingUserStatus(String email, boolean temp);

	public User findByEmail(String email);

}
