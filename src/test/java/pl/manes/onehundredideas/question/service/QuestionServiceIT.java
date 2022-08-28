package pl.manes.onehundredideas.question.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import pl.manes.onehundredideas.category.domain.model.Category;
import pl.manes.onehundredideas.category.domain.repository.CategoryRepository;
import pl.manes.onehundredideas.question.domain.model.Question;
import pl.manes.onehundredideas.question.domain.repository.AnswerRepository;
import pl.manes.onehundredideas.question.domain.repository.QuestionRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@Rollback
class QuestionServiceIT {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Test
    void shouldGetAllQuestions() {
        // given
        questionRepository.deleteAll();

        questionRepository.saveAll(List.of(
                new Question("Question1"),
                new Question("Question2"),
                new Question("Question3")
        ));

        // when
        List<Question> questions = questionService.getQuestions();

        // then
        assertThat(questions)
                .hasSize(3)
                .extracting(Question::getName)
                .containsExactlyInAnyOrder("Question1", "Question2", "Question3");

    }

    @Test
    void shouldGetSingleQuestion() {
        // given
        Question question = new Question("Question2");

        questionRepository.saveAll(List.of(
                new Question("Question1"),
                question,
                new Question("Question3")
        ));

        // when
        Question result = questionService.getQuestion(question.getId());

        // then
        assertThat(result.getId()).isEqualTo(question.getId());
    }

    @Test
    void shouldCreateQuestion() {
        // given
        Question question = new Question("Question");

        // when
        Question result = questionService.createQuestion(question);

        // then
        assertThat(result.getName()).isEqualTo(question.getName());
        assertThat(result.getName()).isEqualTo(questionRepository.getReferenceById(result.getId()).getName());
    }

    @Test
    void shouldUpdateQuestion() {
        // given
        Question question = new Question("Question");
        question = questionService.createQuestion(question);

        question.setName("updated");

        // when
        Question result = questionService.getQuestion(question.getId());

        // then
        assertThat(result.getId()).isEqualTo(question.getId());
    }

    @Test
    void shouldDeleteQuestion() {
        // given
        Question question = new Question("Question");

        question.setName("deleted");

        // when
        Question result = questionService.getQuestion(question.getId());

        // then
        assertThat(result.getId()).isEqualTo(question.getId());
    }

    @Test
    void shouldFindAllQuestionsByCategoryId() {
    }

    @Test
    void findHot() {
    }

    @Test
    void findUnanswered() {
    }

    @Test
    void findByQuery() {
    }
}