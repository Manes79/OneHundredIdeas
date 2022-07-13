package pl.manes.onehundredideas.question.domain.model;

import java.util.UUID;

public class Answer {

    private UUID id;

    private String name;

    public Answer(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
    }

    public Answer() {
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
        return "Answer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
