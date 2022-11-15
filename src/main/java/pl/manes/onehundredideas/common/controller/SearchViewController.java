package pl.manes.onehundredideas.common.controller;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.manes.onehundredideas.common.configuration.OneHundredIdeasConfiguration;
import pl.manes.onehundredideas.question.domain.model.Question;
import pl.manes.onehundredideas.question.service.QuestionService;

import static pl.manes.onehundredideas.common.controller.ControllerUtils.paging;

@Controller
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchViewController extends OneHundredIdeasCommonViewController {

    private final QuestionService questionsService;
    private final OneHundredIdeasConfiguration oneHundredIdeasConfiguration;

    @GetMapping
    public String searchView(
            @RequestParam(name = "query", required = false) String query,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @NotNull Model model
    ) {

        PageRequest pageRequest = PageRequest.of(page - 1, oneHundredIdeasConfiguration.getPagingPageSize());

        if (query != null) {
            Page<Question> questionsPage = questionsService.findByQuery(query, pageRequest);

            model.addAttribute("questionsPage", questionsPage);
            model.addAttribute("query", query);
            paging(model, questionsPage);
        }

        addGlobalAttributes(model);

        return "search/index";
    }
}

