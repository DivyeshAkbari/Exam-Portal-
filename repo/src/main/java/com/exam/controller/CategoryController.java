package com.exam.controller;

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
import com.exam.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

	@Autowired
	private CategoryService c1;
	
	//add category
	
	@PostMapping("/")
	public ResponseEntity<Category> addCategory(@RequestBody Category catogary)
	{
		Category Category1 = c1.addCategory(catogary);
		return ResponseEntity.ok(Category1);
	}
	
	@GetMapping("/{id}")
	public Category getCategory(@PathVariable("id") Long id)
	{
		return c1.getCatogery(id);
	}
	
	//get all
	@GetMapping("/")
	public ResponseEntity<Set<Category>> getCategories()
	{
		return ResponseEntity.ok(c1.getCatogeries());
	}
	
	//update
	@PutMapping("/")
	public Category updatecategory(@RequestBody Category catogary)
	{
		return c1.updateCategory(catogary);
	}
	
	@DeleteMapping("/{id}")
	public void deletcategory(@PathVariable("id") Long id)
	{
		c1.deleteCatogery(id);
	}
}
