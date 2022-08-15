package pl.manes.onehundredideas.category.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import pl.manes.onehundredideas.category.domain.model.Category;
import pl.manes.onehundredideas.category.service.CategoryService;
import pl.manes.onehundredideas.common.dto.Message;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Controller
@RequestMapping("/admin/categories")
public class CategoryAdminViewController {

    private final CategoryService categoryService;

    public CategoryAdminViewController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public String indexView(
            @RequestParam(name = "s", required = false) String search,
            @RequestParam(name = "field", required = false, defaultValue = "id") String field,
            @RequestParam(name = "direction", required = false, defaultValue = "asc") String direction,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size,
            Model model
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.fromString(direction), field);

        String reverseSort = null;
        if ("asc".equals(direction)) {
            reverseSort = "desc";
        } else {
            reverseSort = "asc";
        }

        Page<Category> categoriesPage = categoryService.getCategories(search, pageable);
        model.addAttribute("categoriesPage", categoriesPage);
        model.addAttribute("search", search);
        model.addAttribute("reverseSort", reverseSort);
        paging(model, categoriesPage);

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
            Model model) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("category", category);
            model.addAttribute("message", Message.error("Writing error"));

            return "admin/category/edit";
        }

        try {
            categoryService.updateCategory(id, category);
            redirectAttributes.addFlashAttribute("message", Message.info("Category saved"));

        } catch (Exception exception) {
            model.addAttribute("category", category);
            model.addAttribute("message", Message.error("Unknown recording error"));

            return "admin/category/edit";
        }

        return "redirect:/admin/categories";
    }

    @GetMapping("{id}/delete")
    public String deleteView(@PathVariable UUID id, RedirectAttributes redirectAttributes) {
        categoryService.deleteCategory(id);
        redirectAttributes.addFlashAttribute("message", Message.info("Category delete"));

        return "redirect:/admin/categories";
    }

    private void paging(Model model, Page page) {
        int totalPages = page.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            model.addAttribute("pageNumbers", pageNumbers);
        }
    }

}
