package com.craft.craft.repository.sport;

import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CompetitionRepo extends JpaRepository<Competition, UUID> {
    List<Competition> findAllByStatus(CompetitionStatus status);
}
