package com.craft.craft.service;

import com.craft.craft.dto.CraftInfoCardUpdateDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.user.Admin;
import com.craft.craft.repository.CraftInfoCardRepo;
import com.craft.craft.repository.user.AdminRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class CraftInfoCardService {

    @Autowired
    private CraftInfoCardRepo craftInfoCardRepo;
    @Autowired
    private AdminRepo adminRepo;


    public CraftInfoCard save(CraftInfoCard craftInfoCard) {
        log.info("save(craftInfoCard) with craftInfoCardId({})", craftInfoCard.getId());
        return craftInfoCardRepo.save(craftInfoCard);
    }

    public CraftInfoCard getById(UUID id) {
        log.info("getById({})", id);
        return craftInfoCardRepo.findById(id).orElse(null);
    }

    public List<CraftInfoCard> getAllByStatus(InfoCardStatus status) {
        log.info("getAllByStatus({})", status.name());
        return craftInfoCardRepo.findAllByStatus(status).orElse(null);
    }

    public CraftInfoCard changePhotoURL(UUID id, String url) throws ModelNotFoundException {
        log.info("changePhotoURL({}, {})", id, url);
        CraftInfoCard card = craftInfoCardRepo.findById(id).orElseThrow(() -> new ModelNotFoundException("Карточка не найдена"));
        card.setPhotoURL(url);
        craftInfoCardRepo.save(card);
        return card;
    }

    public CraftInfoCard createCard(CraftInfoCardUpdateDto cardDto) throws ModelNotFoundException {
        String authorName = SecurityContextHolder.getContext().getAuthentication().getName();
        Admin admin = adminRepo.findByUsername(authorName).orElseThrow(() -> new ModelNotFoundException("Пользователя не существует или пользователь не является администратором"));
        return craftInfoCardRepo.save(new CraftInfoCard(
                cardDto.getPhotoURL(),
                cardDto.getTitleFront(),
                cardDto.getTitleBack(),
                cardDto.getTextFront(),
                cardDto.getTitleBack(),
                cardDto.getStatus(),
                admin
        ));
    }

    public CraftInfoCard updateCard(UUID id, CraftInfoCardUpdateDto cardDto) throws ModelNotFoundException {
        log.info("In updateCard({}, cardDto)", id);
        CraftInfoCard card = craftInfoCardRepo.findById(id).orElseThrow(() -> new ModelNotFoundException("Карточка не найдена"));
        card.setPhotoURL(cardDto.getPhotoURL());
        card.setTitleFront(cardDto.getTitleFront());
        card.setTitleBack(cardDto.getTitleBack());
        card.setTextFront(cardDto.getTextFront());
        card.setTitleBack(cardDto.getTextBack());
        card.setStatus(cardDto.getStatus());
        return craftInfoCardRepo.save(card);
    }

    public CraftInfoCard changeStatus(UUID id, InfoCardStatus status) throws ModelNotFoundException {
        log.info("In changeStatus({}, {})", id, status.name());
        CraftInfoCard card = craftInfoCardRepo.findById(id).orElseThrow(() -> new ModelNotFoundException("Карточка не найдена"));
        card.setStatus(status);
        return craftInfoCardRepo.save(card);
    }

    public List<CraftInfoCard> getAllByAuthorUsername(String username) throws ModelNotFoundException {
        log.info("In getAllByAuthorUsername({})", username);
        Admin admin = adminRepo.findByUsername(username).orElse(null);
        if (admin == null) throw new ModelNotFoundException("Нет автора");
        return craftInfoCardRepo.findAllByAuthor(admin).orElse(null);
    }
}
