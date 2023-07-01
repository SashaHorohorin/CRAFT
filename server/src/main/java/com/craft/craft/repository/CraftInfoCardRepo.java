package com.craft.craft.repository;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CraftInfoCardRepo extends JpaRepository<CraftInfoCard, UUID> {
    List<CraftInfoCard> findAllByStatus(InfoCardStatus status);
}
