package pl.manes.onehundredideas.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.manes.onehundredideas.OneHundredIdeasConfiguration;
import pl.manes.onehundredideas.category.service.CategoryService;
import pl.manes.onehundredideas.common.controller.OneHundredIdeasCommonViewController;
import pl.manes.onehundredideas.question.domain.model.Question;
import pl.manes.onehundredideas.question.service.AnswerService;
import pl.manes.onehundredideas.question.service.QuestionService;

import java.util.UUID;

import static pl.manes.onehundredideas.common.controller.ControllerUtils.paging;

@Controller
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionViewController extends OneHundredIdeasCommonViewController {

    private final QuestionService questionsService;
    private final AnswerService answerService;
    private final CategoryService categoryService;
    private final OneHundredIdeasConfiguration oneHundredIdeasConfiguration;

    @GetMapping
    public String indexView(Model model) {
        model.addAttribute("questions", questionsService.getQuestions());
        addGlobalAttributes(model);

        return "question/index";
    }

    @GetMapping("{id}")
    public String singleView(Model model, @PathVariable UUID id) {
        model.addAttribute("question", questionsService.getQuestion(id));
        model.addAttribute("answers", answerService.getAnswers(id));
        addGlobalAttributes(model);

        return "question/single";
    }

    @GetMapping("add")
    public String addView(Model model) {
        model.addAttribute("question", new Question());

        return "question/add";
    }

    @PostMapping
    public String add(Question question) {
        questionsService.createQuestion(question);

        return "redirect/questions";
    }

    @GetMapping("hot")
    public String hotView(
            @RequestParam(name = "page", defaultValue = "1") int page,
            Model model
    ) {

        PageRequest pageRequest = PageRequest.of(page - 1, oneHundredIdeasConfiguration.getPagingPageSize());

        Page<Question> questionsPage = questionsService.findHot(pageRequest);

        model.addAttribute("questionsPage", questionsPage);

        paging(model, questionsPage);
        addGlobalAttributes(model);

        return "question/index";
    }

    @GetMapping("unanswered")
    public String hotUnanswered(
            @RequestParam(name = "page", defaultValue = "1") int page,
            Model model
    ) {

        PageRequest pageRequest = PageRequest.of(page - 1, oneHundredIdeasConfiguration.getPagingPageSize());

        Page<Question> questionsPage = questionsService.findUnanswered(pageRequest);

        model.addAttribute("questionsPage", questionsPage);
        paging(model, questionsPage);
        addGlobalAttributes(model);

        return "question/index";
    }
}
