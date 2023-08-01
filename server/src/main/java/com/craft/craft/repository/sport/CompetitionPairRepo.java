package com.craft.craft.repository.sport;

import com.craft.craft.model.sport.CompetitionPair;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CompetitionPairRepo extends JpaRepository<CompetitionPair, UUID> {
}
