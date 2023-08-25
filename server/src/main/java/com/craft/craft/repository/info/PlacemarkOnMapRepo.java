package com.craft.craft.repository.info;

import com.craft.craft.model.info.PlacemarkOnMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PlacemarkOnMapRepo extends JpaRepository<PlacemarkOnMap, UUID> {
}
