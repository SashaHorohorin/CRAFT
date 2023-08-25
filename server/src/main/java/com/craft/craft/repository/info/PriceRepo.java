package com.craft.craft.repository.info;

import com.craft.craft.model.info.Price;
import com.craft.craft.model.sport.SportComplex;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PriceRepo extends JpaRepository<Price, UUID> {
    Optional<List<Price>> findAllBySportComplex(SportComplex sportComplex);
    Optional<List<Price>> findAllByActiveTrue();
}
