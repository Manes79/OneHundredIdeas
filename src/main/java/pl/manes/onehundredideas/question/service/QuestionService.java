package pl.manes.onehundredideas.question.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.manes.onehundredideas.question.domain.model.Question;
import pl.manes.onehundredideas.question.domain.repository.QuestionRepository;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class QuestionService {

    private QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Transactional(readOnly = true)
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Question getQuestion(UUID id) {
        return questionRepository.getReferenceById(id);
    }

    @Transactional
    public Question createQuestion(Question questionRequest) {
        Question question = new Question();
        question.setName(questionRequest.getName());
        return questionRepository.save(question);
    }

    @Transactional
    public Question updateQuestion(UUID id, Question questionRequest) {
        Question question = questionRepository.getReferenceById(id);
        question.setName(questionRequest.getName());
        return questionRepository.save(question);
    }

    @Transactional
    public void deleteQuestion(UUID id) {
        questionRepository.deleteById(id);
    }
}
