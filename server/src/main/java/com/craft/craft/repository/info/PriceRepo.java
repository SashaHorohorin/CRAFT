package com.craft.craft.repository.info;

import com.craft.craft.model.info.Price;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PriceRepo extends JpaRepository<Price, UUID> {
}
