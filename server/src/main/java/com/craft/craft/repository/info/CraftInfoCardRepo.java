package com.craft.craft.repository.info;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.user.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CraftInfoCardRepo extends JpaRepository<CraftInfoCard, UUID> {
    Optional<List<CraftInfoCard>> findAllByStatus(InfoCardStatus status);
    Optional<List<CraftInfoCard>> findAllByAuthor(Admin admin);
}
