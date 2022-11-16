package pl.manes.onehundredideas.question.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class QuestionDto {

    private UUID id;

    private String name;

    private UUID categoryId;

    private String categoryName;

    private long answers;

    private LocalDateTime created;
}
