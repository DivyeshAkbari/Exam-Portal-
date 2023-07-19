package com.exam.repo;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

	Set<Question> findByQuiz(Quiz quiz);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM question where quiz_qid=?1",nativeQuery = true)
	void deleteByQuizId(Long id);
}
