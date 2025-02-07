package com.service;

import com.model.Category;
import com.repo.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductServiceImpl productService; // Add ProductService

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(int id) {
        return categoryRepository.findById(id);
    }

    public Category updateCategory(int id, Category updatedCategory) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            Category category = existingCategory.get();
            category.setName(updatedCategory.getName());
            category.setImage(updatedCategory.getImage());
            return categoryRepository.save(category);
        } else {
            throw new RuntimeException("Category not found with id: " + id);
        }
    }

    public void deleteCategory(int id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            // Delete all related products before deleting category
            productService.deleteProductsByCategoryId(id);
            categoryRepository.delete(category.get());
        } else {
            throw new RuntimeException("Category not found with id: " + id);
        }
    }
}
