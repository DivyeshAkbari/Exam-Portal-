package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;
import com.exam.repo.QuizRepository;
import com.exam.service.QuizService;

@Service
public class QuizServiceImpl implements QuizService {

	@Autowired
	private QuizRepository q1;
	
	@Override
	public Quiz addQuiz(Quiz auiz) {
		// TODO Auto-generated method stub
		return q1.save(auiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		// TODO Auto-generated method stubt
		System.out.println("service impl");
		quiz.setQid(quiz.getQid());
		return q1.save(quiz);
	}

	@Override
	public Set<Quiz> getQuizes() {
		// TODO Auto-generated method stub
		return new LinkedHashSet<>(q1.findAll());
	}

	@Override
	public Quiz getQuiz(Long id) {
		// TODO Auto-generated method stub
		return q1.findById(id).get();
	}

	@Override
	public void deletQuiz(Long id) {
		// TODO Auto-generated method stub
		System.out.println("inside of service");
		Quiz quiz=new Quiz();
		quiz.setQid(id);
		q1.delete(quiz);
	}

	@Override
	public List<Quiz> getQuizesOfcategory(Category c) {
		// TODO Auto-generated method stub
		return q1.findBycategory(c);
	}

	
	//get active quizzes
	@Override
	public List<Quiz> getActiveQuizzes() {
		// TODO Auto-generated method stub
		return q1.findByActive(true);
	}

	@Override
	public List<Quiz> getActiveQUizzesOfCategory(Category c) {
		// TODO Auto-generated method stub
		return q1.findByCategoryAndActive(c, true);
	}
	
	
	
	
}
