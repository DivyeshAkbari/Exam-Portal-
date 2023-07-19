package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Category;

public interface CategoryService {

	public Category addCategory(Category catogary);
	public Category updateCategory(Category catogary);
	public Set<Category> getCatogeries();
	public Category getCatogery(Long id);
	public void deleteCatogery(Long id);
}
