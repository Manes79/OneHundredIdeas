package pl.manes.onehundredideas;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class QuestionService {

    private final OneHundredIdeasConfiguration oneHundredIdeasConfiguration;

    public QuestionService(OneHundredIdeasConfiguration oneHundredIdeasConfiguration) {
        this.oneHundredIdeasConfiguration = oneHundredIdeasConfiguration;
    }

    public List<Question> getQuestion() {
        return Arrays.asList(
                new Question("Question 1"),
                new Question("Question 2")
        );
    }


    public String test(String value) {
        return String.format("Welcome %s %s", oneHundredIdeasConfiguration.getName(), value);
    }
}
