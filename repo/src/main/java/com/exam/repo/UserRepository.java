package com.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import com.exam.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

  public User findByUsername(String username);

  public User findByEmailIgnoreCase(String email);
  

    //@Modifying
	//@Transactional
	//@Query(value = "SELECT enabled FROM users where username=?1 AND enabled=?2",nativeQuery = true)
    @Query("SELECT u FROM User u WHERE u.username = :Email AND u.enabled = :temp")
	public User checkingUserStatus(@Param("Email") String Email,@Param("temp") boolean temp);

	public ResponseEntity<User> findByEmail(String email);
  
	
	@Query("UPDATE User u set u.password=:Password WHERE u.email = :email")
	public void changePassword(@Param("Password") String encoder,@Param("email") String email);

	public User findById(String email);

	public User findByPhone(String phone);
}
