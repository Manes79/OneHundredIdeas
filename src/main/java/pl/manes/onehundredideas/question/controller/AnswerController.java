package pl.manes.onehundredideas.question.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.manes.onehundredideas.question.domain.model.Answer;
import pl.manes.onehundredideas.question.service.AnswerService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/questions{question-id}/answer")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping
    List<Answer> getAnswers(@PathVariable("question-id") UUID questionId) {
        return answerService.getAnswers(questionId);
    }

    @GetMapping("{answer-id}")
    Answer getAnswer(@PathVariable("question-id") UUID questionId, @PathVariable("answer-id") UUID answerId) {
        return answerService.getAnswer(answerId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    Answer createAnswer(@PathVariable("question-id") UUID questionId, @RequestBody Answer answer) {
        return answerService.createAnswer(questionId, answer);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("{answer-id}")
    Answer updateAnswer(@PathVariable("question-id") UUID questionId, @PathVariable("answer-id") UUID answerId, @RequestBody Answer answer) {
        return answerService.updateAnswer(answerId, answer);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{answer-id}")
    void deleteAnswer(@PathVariable("answer-id") UUID id, @PathVariable("question-id") String parameter) {
        answerService.deleteAnswer(id);
    }
}
