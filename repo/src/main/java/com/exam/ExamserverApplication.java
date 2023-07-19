package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamserverApplication  implements CommandLineRunner{

	@Autowired
	private UserService userService;
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
//		System.out.println("staring code");
//		
//		User u1=new User();
//		u1.setFirstname("Sagar");
//		u1.setLastname("Patel");
//		u1.setUsername("sagarpatel");
//		u1.setPassword("anc");
//		u1.setEmail("sagarpatel123@gmail.com");
//		u1.setProfile("default.png");
//		
//		Role rol=new Role();
//		rol.setRoleid(45L);
//		rol.setRoleName("ADMIN");
//		
//		Set<UserRole> set =new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(rol);
//		userRole.setUser(u1);
//		set.add(userRole);
//		
//		User createUser = userService.createUser(u1, set);
//		System.out.println(createUser.getUsername());
			
	}
}
