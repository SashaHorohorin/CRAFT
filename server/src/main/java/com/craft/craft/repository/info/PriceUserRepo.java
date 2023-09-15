package com.craft.craft.repository.info;

import com.craft.craft.model.info.PriceUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PriceUserRepo extends JpaRepository<PriceUser, UUID> {
}
