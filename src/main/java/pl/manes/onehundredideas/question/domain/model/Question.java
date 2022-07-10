package pl.manes.onehundredideas.question.domain.model;

import java.util.UUID;

public class Question {

    private UUID id;
    private String name;

    public Question(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
    }

    public Question() {
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
        return "Question{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
