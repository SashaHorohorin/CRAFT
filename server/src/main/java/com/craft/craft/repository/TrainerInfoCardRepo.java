package com.craft.craft.repository;

import com.craft.craft.model.info.TrainerInfoCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TrainerInfoCardRepo extends JpaRepository<TrainerInfoCard,UUID> {
}
