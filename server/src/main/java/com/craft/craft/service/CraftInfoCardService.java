package com.craft.craft.service;

import com.craft.craft.dto.CraftInfoCardDto;
import com.craft.craft.dto.CraftInfoCardUpdateDto;
import com.craft.craft.error.exeption.ModelNotFound;
import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.user.Admin;
import com.craft.craft.repository.CraftInfoCardRepo;
import com.craft.craft.repository.user.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CraftInfoCardService {

    @Autowired
    private CraftInfoCardRepo craftInfoCardRepo;
    @Autowired
    private AdminRepo adminRepo;


    public CraftInfoCard save(CraftInfoCard craftInfoCard) {
        return craftInfoCardRepo.save(craftInfoCard);
    }

    public CraftInfoCard getById(UUID id) throws ModelNotFound {
        return craftInfoCardRepo.findById(id).orElse(null);
    }

    public List<CraftInfoCard> getAllByStatus(InfoCardStatus status) {
        return craftInfoCardRepo.findAllByStatus(status).orElse(null);
    }

    public CraftInfoCard changePhotoURL(UUID id, String url) throws ModelNotFound {
        CraftInfoCard card = craftInfoCardRepo.findById(id).orElseThrow(() -> new ModelNotFound("Карточка не найдена"));
        card.setPhotoURL(url);
        craftInfoCardRepo.save(card);
        return card;
    }

    public CraftInfoCard createCard(CraftInfoCardDto cardDto) throws ModelNotFound {
        Admin admin = adminRepo.findByUsername(cardDto.getAuthorUsername()).orElse(null);
        if(admin == null) throw new ModelNotFound("Нет автора");
        return craftInfoCardRepo.save(new CraftInfoCard(
                cardDto.getPhotoURL(),
                cardDto.getTitleFront(),
                cardDto.getTitleBack(),
                cardDto.getTextFront(),
                cardDto.getTitleBack(),
                InfoCardStatus.ACTIVE,
                admin
        ));
    }

    public CraftInfoCard updateCard(UUID id, CraftInfoCardUpdateDto cardDto) throws ModelNotFound {
        CraftInfoCard card = craftInfoCardRepo.findById(id).orElseThrow(() -> new ModelNotFound("Карточка не найдена"));
        card.setPhotoURL(cardDto.getPhotoURL());
        card.setTitleFront(cardDto.getTitleFront());
        card.setTitleBack(cardDto.getTitleBack());
        card.setTextFront(cardDto.getTextFront());
        card.setTitleBack(cardDto.getTextBack());
        card.setStatus(cardDto.getStatus());
        return craftInfoCardRepo.save(card);
    }

    public CraftInfoCard changeStatus(UUID id, InfoCardStatus status) throws ModelNotFound {
        CraftInfoCard card = craftInfoCardRepo.findById(id).orElseThrow(() -> new ModelNotFound("Карточка не найдена"));
        card.setStatus(status);
        return craftInfoCardRepo.save(card);
    }

    public List<CraftInfoCard> getAllByAuthorUsername(String username) throws ModelNotFound {
        Admin admin = adminRepo.findByUsername(username).orElse(null);
        if(admin == null) throw new ModelNotFound("Нет автора");
        return craftInfoCardRepo.findAllByAuthor(admin).orElse(null);
    }
}
