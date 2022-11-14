package pl.manes.onehundredideas.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.jetbrains.annotations.NotNull;

@Data
@AllArgsConstructor
public class Message {

    private String title;
    private String content;

    public static @NotNull Message info(String message) {
        return new Message("Info", message);
    }

    public static @NotNull Message error(String message) {
        return new Message("Error", message);
    }
}

