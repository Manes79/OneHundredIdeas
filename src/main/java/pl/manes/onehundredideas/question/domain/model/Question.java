package pl.manes.onehundredideas.question.domain.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.manes.onehundredideas.category.domain.model.Category;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "questions")
@Getter
@Setter
@ToString
public class Question {

    @Id
    private UUID id;
    private String name;

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "question")
    @ToString.Exclude
    private Set<Answer> answers;

    public Question() {
        this.id = UUID.randomUUID();
    }

    public Question(String name) {
//        this();
        this.id = UUID.randomUUID();
        this.name = name;
    }

    public Question addAnswer(Answer answer) {
        if (answers == null) {
            answers = new LinkedHashSet<>();
        }

        answer.setQuestion(this);
        answers.add(answer);

        return this;
    }
}
