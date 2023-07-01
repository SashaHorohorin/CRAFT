package com.craft.craft.service;

import com.craft.craft.model.info.TrainerInfoCard;
import com.craft.craft.repository.TrainerInfoCardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TrainerInfoCardService {

    @Autowired
    private TrainerInfoCardRepo trainerInfoCardRepo;


    public TrainerInfoCard save(TrainerInfoCard card) {
        return trainerInfoCardRepo.save(card);
    }

    public TrainerInfoCard getById(UUID id){
        return trainerInfoCardRepo.getReferenceById(id);
    }
}
