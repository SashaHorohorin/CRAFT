package com.craft.craft.repository.sport;

import com.craft.craft.model.sport.Competition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CompetitionRepo extends JpaRepository<Competition, UUID> {
}
