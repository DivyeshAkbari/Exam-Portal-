package com.exam.controller;

import java.util.List;
import java.util.Map;
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

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QueestionController {

	@Autowired
	private QuestionService q1;
	
	@Autowired
	private QuizService quizService;

	private Map<Object, Object> of;
	
	
	
	  
	//add question
	@PostMapping("/")
	public ResponseEntity<Question> addQuestion(@RequestBody Question questin)
	{
		return ResponseEntity.ok(q1.addQuestion(questin));
	}
	
	//upadate question
	@PutMapping("/")
	public ResponseEntity<Question> upadeQuestion(@RequestBody Question question)
	{
		return ResponseEntity.ok(q1.updateQuestion(question));
	}
	
	//get question of any quiz
	
	@GetMapping("/quiz/{qid}/{temp}")
	public ResponseEntity<Set<Question>> getQustionOfQuiz(@PathVariable("qid") Long qid,@PathVariable("temp") int temp)
	{
		Quiz quiz = new Quiz();
		quiz.setQid(qid);
		Set<Question> question=q1.getQuestionOfQuiz(quiz);
		
		if(temp==0)
		{
			question.forEach((q)->{
			q.setAnswer("");
			});
		}
		
		return ResponseEntity.ok(question);
		
//		Quiz quiz = quizService.getQuiz(qid);
//		java.util.List<Question> question=quiz.getQuestion();
//		
//		List list=(List) new ArrayList(question);
//		if(((Set<Question>) list).size()>Integer.parseInt(quiz.getNumberofQuestions()))
//		{
//			list=(List) ((java.util.List<Question>) list).subList(0,Integer.parseInt(quiz.getNumberofQuestions()+1));	
//		}
//		Collections.shuffle((java.util.List<?>) list);
		//return ResponseEntity.ok(list);
	}

	
	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<Set<Question>> getQustionOfQuizAdmin(@PathVariable("qid") Long qid)
	{
		Quiz quiz = new Quiz();
		quiz.setQid(qid);
		Set<Question> question=q1.getQuestionOfQuiz(quiz);
		return ResponseEntity.ok(question);
	}
	
	
	//get single question
	@GetMapping("/{id}")
	public ResponseEntity<Question> get(@PathVariable("id") Long id)
	{
		return ResponseEntity.ok(q1.getQuestion(id));
	}
	
	@DeleteMapping("/{id}")
	public void deletQuestion(@PathVariable("id") Long id)
	{
		q1.deletQuestion(id);
	}
	
	//get count of question basedon quiz
	
	@GetMapping("/count/{qid}")
	public int countQuestionOfQuiz(@PathVariable("qid") Long qid)
	{
		int count = q1.getCount(qid);
		return count;
	}
	
	//evaluation of quiz
	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions)
	{
		double marksGot=0;
		int currectAnswer=0;
		int attempted=0;
		
		System.out.println(questions);
		for(Question q:questions)
		{
			//single question 
			Question question = q1.get(q.getId());
			if(question.getAnswer().equals(q.getGivenAnswer()))
			{
				//correct
				currectAnswer++;
				double marksSingle=Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
				marksGot+=marksSingle;
				
			}
			if( q.getGivenAnswer()!=null )
			{
				attempted++;
			}
		}
	
		Map<Object,Object> map=Map.of("marksGot",marksGot,"currectAnswer",currectAnswer,"attempted",attempted);
		return ResponseEntity.ok(map);
	}
	
	
	
}
