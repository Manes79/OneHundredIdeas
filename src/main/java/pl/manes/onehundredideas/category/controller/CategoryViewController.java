package pl.manes.onehundredideas.category.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.manes.onehundredideas.category.domain.model.Category;
import pl.manes.onehundredideas.category.service.CategoryService;
import pl.manes.onehundredideas.question.domain.model.Question;
import pl.manes.onehundredideas.question.service.QuestionService;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/categories")
public class CategoryViewController {

    private final CategoryService categoryService;
    private final QuestionService questionService;


    public CategoryViewController(CategoryService categoryService, QuestionService questionService) {
        this.categoryService = categoryService;
        this.questionService = questionService;
    }

    @GetMapping("{id}")
    public String singleView(@PathVariable UUID id, Model model) {
        Category category = categoryService.getCategory(id);
        List<Question> questions = questionService.findAllByCategoryId(id);

        model.addAttribute("category", category);
        model.addAttribute("questions", questions);

        return "category/single";

    }
}