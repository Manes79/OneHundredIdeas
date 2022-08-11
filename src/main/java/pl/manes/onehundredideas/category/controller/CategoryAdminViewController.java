package pl.manes.onehundredideas.category.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import pl.manes.onehundredideas.category.domain.model.Category;
import pl.manes.onehundredideas.category.service.CategoryService;

import javax.validation.Valid;
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
        model.addAttribute("category", categoryService.getCategory(id));
        return "/admin/category/edit";
    }

    @PostMapping("{id}")
    public String edit(
            @PathVariable UUID id,
            @Valid @ModelAttribute("category") Category category,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            Model model){

        if (bindingResult.hasErrors()) {
            model.addAttribute("category",category);
            model.addAttribute("message","Writing error");
            return "/admin/category/edit";
        }

        try {
            categoryService.updateCategory(id, category);
            redirectAttributes.addFlashAttribute("message","Catagory saved");

        } catch (Exception exception) {
            model.addAttribute("category", category);
            model.addAttribute("message","Unknown recording error");
        }

            return "/admin/category/edit";
        }


    @GetMapping("{id}/delete")
    public String deleteView(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return "redirect:/admin/categories";
    }

}
