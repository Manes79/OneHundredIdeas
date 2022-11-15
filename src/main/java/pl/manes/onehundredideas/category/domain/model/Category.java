package pl.manes.onehundredideas.category.domain.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.manes.onehundredideas.question.domain.model.Question;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "categories")
@Getter
@Setter
@ToString
public class Category {

    @Id
    private UUID id;

    @NotBlank(message = "{ideas.validation.name.NotBlank.message}")
    @Size(min = 3, max = 255)
    private String name;

    @OneToMany(mappedBy = "category")
    @ToString.Exclude
    private List<Question> questions;

    public Category() {
        this.id = UUID.randomUUID();
    }

    public Category(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
    }
}
