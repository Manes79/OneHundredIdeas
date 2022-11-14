package pl.manes.onehundredideas.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatisticsDto {

    private long questions;
    private long answers;
}
