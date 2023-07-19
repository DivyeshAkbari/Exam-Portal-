package com.exam.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;
import com.exam.repo.QuizRepository;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "http://localhost:4200")
public class QuizController {

	@Autowired
	private QuizService q1;
	
	@Autowired
	private QuestionService question;
	
	@Autowired
	private QuizRepository quizRepo;
	
	@PostMapping("/")
	public ResponseEntity<Quiz> addquiz(@RequestBody Quiz quiz)
	{
		return ResponseEntity.ok(q1.addQuiz(quiz));
	}
	
	@PutMapping("/")
	public ResponseEntity<Quiz> updateQuize(@RequestBody Quiz quiz)
	{
		System.out.println("controller");
		return ResponseEntity.ok(q1.updateQuiz(quiz));
	}
	
	@GetMapping("/")
	public ResponseEntity<Set<Quiz>> getQuizes()
	{
		return ResponseEntity.ok(q1.getQuizes());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Quiz> getQuiz(@PathVariable("id") Long id)
	{
		return ResponseEntity.ok(q1.getQuiz(id));
	}
	
	@DeleteMapping("/{id}")
	public String deletQuiz(@PathVariable("id") Long qid)
	{
		System.out.println("yess");
		System.out.println("id is"+ qid);
		
		question.deletQuestion(qid);
		q1.deletQuiz(qid);
		return "success";
	}
	
	
	//
	@GetMapping("/category/{cid}")
	public List<Quiz> getQuizzeOfCategory(@PathVariable("cid") long cid)
	{
		Category c=new Category();
		c.setId(cid);
		return this.q1.getQuizesOfcategory(c);
	}
	
	
	//get active quizzes
	@GetMapping("/active")
	public List<Quiz> getAcriveQuizzes()
	{
		return q1.getActiveQuizzes();
	}
	
	//get active quizzes of category
	@GetMapping("/category/active/{cid}")
	public List<Quiz> getAcriveQuizzesOfCategory(@PathVariable("cid") Long cid)
	{
		Category category = new Category();
		category.setId(cid);
		return q1.getActiveQUizzesOfCategory(category);
	}
	
	
	//getting number of question for the respective quiz
	@GetMapping("/question/{qid}")
	public Quiz getQuestionOfQuiz(@PathVariable("qid") Long qid)
	{
		return this.quizRepo.findByQid(qid);
	}
}
