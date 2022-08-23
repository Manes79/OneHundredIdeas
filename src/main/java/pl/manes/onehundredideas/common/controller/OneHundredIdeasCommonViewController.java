package pl.manes.onehundredideas.common.controller;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import pl.manes.onehundredideas.category.service.CategoryService;

public abstract class OneHundredIdeasCommonViewController {

    @Autowired
    protected CategoryService categoryService;

    protected void addGlobalAttributes(@NotNull Model model) {
        model.addAttribute("categories", categoryService.getCategories(
                PageRequest.of(0, 10, Sort.by("name").ascending())
        ));
    }
}
