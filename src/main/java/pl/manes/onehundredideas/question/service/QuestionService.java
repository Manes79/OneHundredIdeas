package pl.manes.onehundredideas.question.service;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.manes.onehundredideas.common.dto.StatisticsDto;
import pl.manes.onehundredideas.question.domain.model.Question;
import pl.manes.onehundredideas.question.domain.repository.QuestionRepository;
import pl.manes.onehundredideas.question.dto.QuestionDto;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final QuestionMapper questionMapper;

    @Transactional(readOnly = true)
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Question getQuestion(UUID id) {
        return questionRepository.findById(id)
                .orElseThrow();
    }

    @Transactional
    public Question createQuestion(@NotNull Question questionRequest) {
        Question question = new Question();
        question.setName(questionRequest.getName());
        return questionRepository.save(question);
    }

    @Transactional
    public Question updateQuestion(UUID id, @NotNull Question questionRequest) {
        Question question = questionRepository.findById(id)
                .orElseThrow();
        question.setName(questionRequest.getName());
        return questionRepository.save(question);
    }

    @Transactional
    public void deleteQuestion(UUID id) {
        questionRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Question> findAllByCategoryId(UUID id) {
        return questionRepository.findAllByCategoryId(id, Pageable.unpaged());
    }

    @Transactional(readOnly = true)
    public Page<Question> findHot(Pageable pageable) {
        return questionRepository.findHot(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Question> findUnanswered(Pageable pageable) {
        return questionRepository.findUnanswered(pageable);
    }

    public Page<Question> findByQuery(String query, Pageable pageable) {
        return questionRepository.findByQuery(query, pageable);
    }

    @Transactional(readOnly = true)
    public StatisticsDto statistics() {
        return questionRepository.statistics();
    }

    @Transactional(readOnly = true)
    public List<QuestionDto> findTop(int limit) {
        return questionRepository.findAll(PageRequest.of(0, limit))
                .get()
                .map(questionMapper::map)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<QuestionDto> findTop(UUID categoryId, int limit) {
        return questionRepository.findAllByCategoryId(categoryId, PageRequest.of(0, limit))
                .stream()
                .map(questionMapper::map)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<QuestionDto> findRandom(int limit) {
        return questionRepository.findRandomQuestions(limit)
                .stream()
                .map(questionMapper::map)
                .collect(Collectors.toList());
    }
}
