package com.service;

import java.util.List;
import java.util.Optional;

import com.model.Category;

public interface CategoryService {
    Category createCategory(Category category);
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(int id);
    Category updateCategory(int id, Category category);
    void deleteCategory(int id);
}

