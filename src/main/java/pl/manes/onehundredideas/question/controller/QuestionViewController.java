package pl.manes.onehundredideas.question.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.manes.onehundredideas.question.domain.model.Question;
import pl.manes.onehundredideas.question.service.AnswerService;
import pl.manes.onehundredideas.question.service.QuestionService;

import java.util.UUID;

@Controller
@RequestMapping("/questions")
public class QuestionViewController {

    private final QuestionService questionService;
    private final AnswerService answerService;

    public QuestionViewController(QuestionService questionService, AnswerService answerService) {
        this.questionService = questionService;
        this.answerService = answerService;
    }

    @GetMapping
    public String indexView(Model model) {
        model.addAttribute("questions", questionService.getQuestions());
        return "question/index";
    }

    @GetMapping("{id}")
    public String singleView(Model model, @PathVariable UUID id) {
        model.addAttribute("question", questionService.getQuestion(id));
        model.addAttribute("answers", answerService.getAnswers(id));
        return "question/single";
    }

    @GetMapping("add")
    public String addView(Model model) {
        model.addAttribute("question", new Question());
        return "question/add";
    }

    @PostMapping
    public String add(Question question) {
        questionService.createQuestion(question);
        return "redirect/questions";
    }
}
