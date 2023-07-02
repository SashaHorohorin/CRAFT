package com.craft.craft.controller;

import com.craft.craft.dto.CraftInfoCardDto;
import com.craft.craft.dto.CraftInfoCardUpdateDto;
import com.craft.craft.error.exeption.ModelNotFound;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.service.CraftInfoCardService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public List<CraftInfoCardDto> getActiveCards(){
        return craftInfoCardService.getAllByStatus(InfoCardStatus.ACTIVE).stream().map(CraftInfoCardDto::getDtoFromCraftInfoCard).collect(Collectors.toList());
    }

    @Operation(
            summary = "Обновить данные в карточке"
    )
    @PostMapping("/update/{id}")
    public CraftInfoCardDto updateCard(@PathVariable UUID id, @RequestBody CraftInfoCardUpdateDto cardDto) throws ModelNotFound {
        return CraftInfoCardDto.getDtoFromCraftInfoCard(craftInfoCardService.updateCard(id,cardDto));
    }

    @Operation(
            summary = "Скрыть карточку",
            description = "ставит карточке статус DISABLE"
    )
    @GetMapping("/inactivate/{id}")
    public CraftInfoCardDto disableCart(@PathVariable UUID id) throws ModelNotFound {
        return CraftInfoCardDto.getDtoFromCraftInfoCard(craftInfoCardService.changeStatus(id, InfoCardStatus.DISABLE));
    }

    @Operation(
            summary = "Сделать карточку активной",
            description = "ставит карточке статус Active"
    )
    @GetMapping("/activate/{id}")
    public CraftInfoCardDto activateCart(@PathVariable UUID id) throws ModelNotFound {
        return CraftInfoCardDto.getDtoFromCraftInfoCard(craftInfoCardService.changeStatus(id, InfoCardStatus.ACTIVE));
    }

    @Operation(
            summary = "Карточки по имени автора"
    )
    @GetMapping("/get-by-author/{username}")
    public List<CraftInfoCardDto> getAllByAuthor(@PathVariable String username) throws ModelNotFound {
        return craftInfoCardService.getAllByAuthorUsername(username).stream().map(CraftInfoCardDto::getDtoFromCraftInfoCard).collect(Collectors.toList());
    }
}
