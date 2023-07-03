package com.craft.craft.service;

import com.craft.craft.model.info.PlacemarkOnMap;
import com.craft.craft.repository.PlacemarkOnMapRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
    public class PlacemarkOnMapService {

    @Autowired
    private PlacemarkOnMapRepo placemarkOnMapRepo;

    public PlacemarkOnMap save(PlacemarkOnMap placemarkOnMap){
        return placemarkOnMapRepo.save(placemarkOnMap);
    }

    public PlacemarkOnMap getById(UUID id){
        return placemarkOnMapRepo.findById(id).orElse(null);
    }


}
