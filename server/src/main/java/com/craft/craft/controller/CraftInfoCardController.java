package com.craft.craft.controller;

import com.craft.craft.dto.CraftInfoCardUpdateDto;
import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.service.CraftInfoCardService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/craft-info-card")
public class CraftInfoCardController {

    @Autowired
    private CraftInfoCardService craftInfoCardService;

    @Operation(
            summary = "Текущие активные карточки",
            description = "Возвращает карточки со статусом ACTIVE"
    )
    @GetMapping("/get-active")
    public List<CraftInfoCard> getActiveCards(){
        return craftInfoCardService.getAllByStatus(InfoCardStatus.ACTIVE);
    }

    @Operation(
            summary = "Обновить данные в карточке"
    )
    @PostMapping("/update/{id}")
    public CraftInfoCard updateCard(@PathVariable UUID id, @RequestBody CraftInfoCardUpdateDto cardDto){
        return craftInfoCardService.updateCard(id,cardDto);
    }

    @Operation(
            summary = "Скрыть карточку",
            description = "ставит карточке статус DISABLE"
    )
    @GetMapping("/disable/{id}")
    public CraftInfoCard disableCart(@PathVariable UUID id){
        return craftInfoCardService.changeStatus(id, InfoCardStatus.DISABLE);
    }

    @Operation(
            summary = "Сделать карточку активной",
            description = "ставит карточке статус Active"
    )
    @GetMapping("/activate/{id}")
    public CraftInfoCard activateCart(@PathVariable UUID id){
        return craftInfoCardService.changeStatus(id, InfoCardStatus.ACTIVE);
    }

    @Operation(
            summary = "Карточки по имени автора"
    )
    @GetMapping("/get-by-author/{username}")
    public List<CraftInfoCard> getAllByAuthor(@PathVariable String username){
        return craftInfoCardService.getAllByAuthorUsername(username);
    }
}
