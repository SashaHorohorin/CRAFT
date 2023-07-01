package com.craft.craft.service;

import com.craft.craft.dto.CraftInfoCardDto;
import com.craft.craft.dto.CraftInfoCardUpdateDto;
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

    public CraftInfoCard getById(UUID id) {
        return craftInfoCardRepo.getReferenceById(id);
    }

    public List<CraftInfoCard> getAllByStatus(InfoCardStatus status) {
        return craftInfoCardRepo.findAllByStatus(status);
    }

    public CraftInfoCard changePhotoURL(UUID id, String url) {
        CraftInfoCard card = craftInfoCardRepo.getReferenceById(id);
        card.setPhotoURL(url);
        return craftInfoCardRepo.save(card);
    }

    public CraftInfoCard createCard(CraftInfoCardDto cardDto) {
        Admin admin = adminRepo.findByUsername(cardDto.getAuthorUsername());
        return new CraftInfoCard(
                cardDto.getPhotoURL(),
                cardDto.getHeader(),
                cardDto.getShortText(),
                cardDto.getLongText(),
                InfoCardStatus.ACTIVE,
                admin
        );
    }

    public CraftInfoCard updateCard(UUID id, CraftInfoCardUpdateDto cardDto) {
        CraftInfoCard card = craftInfoCardRepo.getReferenceById(id);
        card.setPhotoURL(cardDto.getPhotoURL());
        card.setHeader(cardDto.getHeader());
        card.setShortText(cardDto.getShortText());
        card.setLongText(cardDto.getLongText());
        card.setStatus(cardDto.getStatus());
        return craftInfoCardRepo.save(card);
    }

    public CraftInfoCard changeStatus(UUID id, InfoCardStatus status) {
        CraftInfoCard card = craftInfoCardRepo.getReferenceById(id);
        card.setStatus(status);
        return craftInfoCardRepo.save(card);
    }

    public List<CraftInfoCard> getAllByAuthorUsername(String username) {
        Admin admin = adminRepo.findByUsername(username);
        return craftInfoCardRepo.findAllByAuthor(admin);
    }
}
