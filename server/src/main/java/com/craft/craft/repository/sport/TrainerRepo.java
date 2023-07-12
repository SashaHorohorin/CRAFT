package com.craft.craft.repository.sport;

import com.craft.craft.model.sport.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TrainerRepo extends JpaRepository<Trainer,UUID> {
    Optional<Trainer> findByName(String name);
}
