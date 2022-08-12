package pl.manes.onehundredideas.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Message {

    private String title;
    private String content;

    public static Message info(String message) {
        return new Message("Info", message);
    }

    public static Message error(String message) {
        return new Message("Error", message);
    }
}
