package pl.manes.onehundredideas.categories.domain.model;

import java.util.UUID;

public class Category {

    private UUID id;

    private String name;

    public Category(String s) {
    }

    public Category(UUID id, String name) {
        this.id = UUID.randomUUID();
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
