package com.craft.craft.service;

import com.craft.craft.model.sport.Trainer;
import com.craft.craft.repository.sport.TrainerRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class TrainerService {

    @Autowired
    private TrainerRepo trainerRepo;


    public Trainer save(Trainer trainer) {
        log.info("save(trainer) with trainerId({})", trainer.getId());
        return trainerRepo.save(trainer);
    }

    public Trainer getById(UUID id){
        log.info("getById({})", id);
        return trainerRepo.getReferenceById(id);
    }

    public List<Trainer> getAll(){
        log.info("getAll()");
        return trainerRepo.findAll();
    }

    public void delete(Trainer trainer) {
        log.info("delete(trainer) with trainerId({})", trainer.getId());
        trainerRepo.delete(trainer);
    }
}
