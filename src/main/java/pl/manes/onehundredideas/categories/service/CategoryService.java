package pl.manes.onehundredideas.categories.service;

import org.springframework.stereotype.Service;
import pl.manes.onehundredideas.categories.domain.model.Category;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class CategoryService {

    public List<Category> getCategories() {
        return Arrays.asList(
                new Category("Category 1"),
                new Category("Category 2")
        );
    }

    public Category getCategory(UUID id) {
        return new Category("Category " + id);
    }

    public Category createCategory(Category category) {
        category.setId(UUID.randomUUID());
        return category;
    }

    public Category updateCategory(UUID id, Category category) {
        return category;
    }

    public void deleteCategory(UUID id) {

    }
}
