package pl.manes.onehundredideas.category.domain.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import java.util.UUID;
@Entity
@Table(name = "categories")
public class Category {

    @Id
    private UUID id;

    @NotBlank(message = "{onehundredideas.validation.name.NotBlank.message}")
    private String name;

    public Category() {
        this.id = UUID.randomUUID();
    }

    public Category(String name) {
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
