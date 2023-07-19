package com.exam.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.exam.service.impl.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsServiceImpl userdetails;
	
	@Autowired
	private JwtUtils utils;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		final String requestToken = request.getHeader("Authorization");
		System.out.println(requestToken);
		String username=null;
		String JwtToken=null;
		
		if(requestToken!=null && requestToken.startsWith("bearer "))
		{
			try {
				JwtToken=requestToken.substring(7);
				username = utils.extractUsername(JwtToken);
				
			} catch (ExpiredJwtException  e) {
				e.printStackTrace();
				// TODO: handle exception
				System.out.println("Jwt Token Has Expired");
			}
		}
		else
		{
			System.out.println("invalid Token not Starts With bearer String ");
		}
		
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
		{
			UserDetails userDetails = userdetails.loadUserByUsername(username);
			if(utils.validateToken(JwtToken, userDetails))
			{
				//token is valid
				UsernamePasswordAuthenticationToken u1=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				u1.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(u1);
			}
		}
		else
		{
			System.out.println("not valid token");
		}
		
		filterChain.doFilter(request, response);
	}	
}
