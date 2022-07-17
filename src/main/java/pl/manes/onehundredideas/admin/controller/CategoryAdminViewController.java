package pl.manes.onehundredideas.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.manes.onehundredideas.category.model.Category;
import pl.manes.onehundredideas.category.service.CategoryService;

import java.util.UUID;

@Controller
@RequestMapping("/admin/categories")
public class CategoryAdminViewController {

    private final CategoryService categoryService;

    public CategoryAdminViewController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public String indexView(Model model) {
        model.addAttribute("categories", categoryService.getCategories());
        return "/admin/category/index";
    }

    @GetMapping("{id}")
    public String editView(Model model, @PathVariable UUID id) {
        model.addAttribute("category", categoryService.updateCategory(id, new Category()));
        return "/admin/category/edit";
    }
}
