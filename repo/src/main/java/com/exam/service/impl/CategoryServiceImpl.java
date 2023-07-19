package com.exam.service.impl;

import java.util.LinkedHashSet;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryRepository repo;
	
	@Override
	public Category addCategory(Category catogary) {
		// TODO Auto-generated method stub
		return repo.save(catogary);
	}

	@Override
	public Category updateCategory(Category catogary) {
		// TODO Auto-generated method stub
		catogary.setId(catogary.getId());
		return repo.save(catogary);
	}

	@Override
	public Set<Category> getCatogeries() {
		// TODO Auto-generated method stub
		return new LinkedHashSet<>(repo.findAll());
	}

	@Override
	public Category getCatogery(Long id) {
		// TODO Auto-generated method stub
		return repo.findById(id).get();
	}

	@Override
	public void deleteCatogery(Long id) {
		// TODO Auto-generated method stub
		 repo.deleteById(id);
	}

}
