package com.exam.service;

import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;

public interface QuestionService {

	public Question addQuestion(Question question);
	public Question updateQuestion(Question question);
	public Set<Question> getQuestions();
	public Question getQuestion(Long id);
	public String deletQuestion(Long id);
	public Set<Question> getQuestionOfQuiz(Quiz quiz);
	public Question get(Long id);
	public int getCount(Long qid);
}
