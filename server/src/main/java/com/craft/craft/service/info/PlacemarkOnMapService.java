package com.craft.craft.service.info;

import com.craft.craft.model.info.PlacemarkOnMap;
import com.craft.craft.repository.info.PlacemarkOnMapRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
    public class PlacemarkOnMapService {

    @Autowired
    private PlacemarkOnMapRepo placemarkOnMapRepo;

    public PlacemarkOnMap save(PlacemarkOnMap placemarkOnMap){
        log.info("save(placemarkOnMap) with placemarkOnMapId({})", placemarkOnMap.getId());
        return placemarkOnMapRepo.save(placemarkOnMap);
    }

    public PlacemarkOnMap getById(UUID id){
        log.info("getById({}))", id);
        return placemarkOnMapRepo.findById(id).orElse(null);
    }


}
