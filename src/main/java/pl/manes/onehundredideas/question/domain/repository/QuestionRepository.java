package pl.manes.onehundredideas.question.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.manes.onehundredideas.question.domain.model.Question;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {

    List<Question> findAllByCategoryId(UUID id);

    @Query("from Question q order by q.answers.size desc")
    Page<Question> findHot(Pageable pageable);

    @Query("from Question q where q.answers.size = 0")
    Page<Question> findUnanswered(Pageable pageable);
}
