package com.craft.craft.repository.sport;

import com.craft.craft.model.sport.Train;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TrainRepo extends JpaRepository<Train, UUID> {
    Optional<List<Train>> findAllByStartTrainBetween(Date startDate, Date endDate);
}
