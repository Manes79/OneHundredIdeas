package pl.manes.onehundredideas.category.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class CategoryWithStatisticsDto {

    private UUID id;

    private String name;

    private long questions;

    private long answers;
}
