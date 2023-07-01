package com.craft.craft.service;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.repository.CraftInfoCardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CraftInfoCardService {

    @Autowired
    private CraftInfoCardRepo craftInfoCardRepo;

    public CraftInfoCard save(CraftInfoCard craftInfoCard){
        return craftInfoCardRepo.save(craftInfoCard);
    }
    public CraftInfoCard getById(UUID id){
        return craftInfoCardRepo.getReferenceById(id);
    }

    public List<CraftInfoCard> getAllByStatus(InfoCardStatus status){
        return craftInfoCardRepo.findAllByStatus(status);
    }

    public CraftInfoCard changePhotoURL(UUID id, String url){
        CraftInfoCard card = craftInfoCardRepo.getReferenceById(id);
        card.setPhotoURL(url);
        return craftInfoCardRepo.save(card);
    }
}
