package pl.manes.onehundredideas.question.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.manes.onehundredideas.question.domain.model.Answer;
import pl.manes.onehundredideas.question.domain.model.Question;
import pl.manes.onehundredideas.question.domain.repository.AnswerRepository;
import pl.manes.onehundredideas.question.domain.repository.QuestionRepository;

import java.util.List;
import java.util.UUID;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    @Transactional(readOnly = true)
    public List<Answer> getAnswers(UUID questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    @Transactional(readOnly = true)
    public Answer getAnswer(UUID id) {
        return answerRepository.getReferenceById(id);
    }

    @Transactional
    public Answer createAnswer(UUID questionId, Answer answerRequest) {
        Answer answer = new Answer();
        answer.setName(answerRequest.getName());
        Question question = questionRepository.getReferenceById(questionId);
        question.addAnswer(answer);
        answerRepository.save(answer);
        questionRepository.save(question);
        return answer;
    }

    @Transactional
    public Answer updateAnswer(UUID answerId, Answer answerRequest) {
        Answer answer = answerRepository.getReferenceById(answerId);
        answer.setName(answerRequest.getName());
        return answerRepository.save(answer);
    }

    @Transactional
    public void deleteAnswer(UUID answerId) {
        answerRepository.deleteById(answerId);
    }
}
