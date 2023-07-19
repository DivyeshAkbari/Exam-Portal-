package com.exam.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;

public interface QuizService {

	public Quiz addQuiz(Quiz auiz);
	public Quiz updateQuiz(Quiz quiz);
	public Set<Quiz> getQuizes();
	public Quiz getQuiz(Long id);
	public void deletQuiz(Long id);
	public List<Quiz> getQuizesOfcategory(Category c);
	
	public List<Quiz> getActiveQuizzes();
	public List<Quiz> getActiveQUizzesOfCategory(Category c);
}
