package com.example.demo.services;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.models.Category;

import java.util.List;

public interface ICategoryService {

    Category createCategory (CategoryDTO categoryDTO);

    Category getCategoryById (Long id);

    List<Category> getAllCategory();

    Category updateCategory(CategoryDTO categoryDTO, long categoryId);

    void deleteCategory (long id);

}
