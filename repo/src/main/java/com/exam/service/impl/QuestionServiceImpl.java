package com.exam.service.impl;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.repo.QuestionRepository;
import com.exam.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository q1;
	
	@Override
	public Question addQuestion(Question question) {
		// TODO Auto-generated method stub
		return q1.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		// TODO Auto-generated method stub
		return q1.save(question);
	}

	@Override
	public Set<Question> getQuestions() {
		// TODO Auto-generated method stub
		return new LinkedHashSet<>(q1.findAll());
	}

	@Override
	public Question getQuestion(Long id) {
		// TODO Auto-generated method stub
		return q1.findById(id).get();
	}

	@Override
	public String deletQuestion(Long id) {
		// TODO Auto-generated method stub
		
		q1.deleteByQuizId(id);
		return "success";
	}

	@Override
	public Set<Question> getQuestionOfQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return q1.findByQuiz(quiz);
	}

	@SuppressWarnings("deprecation")
	@Override
	public Question get(Long id) {

		return q1.getOne(id);
	}

	@Override
	public int getCount(Long qid) {
		// TODO Auto-generated method stub
		
		Quiz quiz=new Quiz();
		quiz.setQid(qid);
		
		Set<Question> question=new HashSet<>();
		question=q1.findByQuiz(quiz);
		return question.size();
	}
}
