package pl.manes.onehundredideas.question.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.manes.onehundredideas.question.domain.model.Answer;

import java.util.UUID;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, UUID> {
}
