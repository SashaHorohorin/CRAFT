package com.craft.craft.controller;

import com.craft.craft.dto.CraftInfoCardRequestDto;
import com.craft.craft.dto.CraftInfoCardUpdateDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
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
    public List<CraftInfoCardRequestDto> getActiveCards(){
        return craftInfoCardService.getAllByStatus(InfoCardStatus.ACTIVE).stream().map(CraftInfoCardRequestDto::getDtoFromCraftInfoCard).collect(Collectors.toList());
    }

    @Operation(
            summary = "Создать карточку",
            description ="Статусы: ACTIVE, DISABLE"
    )
    @PostMapping("/create")
    public CraftInfoCardRequestDto createCard(@RequestBody CraftInfoCardUpdateDto cardDto) throws ModelNotFoundException {
        return CraftInfoCardRequestDto.getDtoFromCraftInfoCard(craftInfoCardService.createCard(cardDto));
    }


    @Operation(
            summary = "Обновить данные в карточке",
            description ="Статусы: ACTIVE, DISABLE"
    )
    @PostMapping("/update/{id}")
    public CraftInfoCardRequestDto updateCard(@PathVariable UUID id, @RequestBody CraftInfoCardUpdateDto cardDto) throws ModelNotFoundException {
        return CraftInfoCardRequestDto.getDtoFromCraftInfoCard(craftInfoCardService.updateCard(id, cardDto));
    }

    @Operation(
            summary = "Скрыть карточку",
            description = "ставит карточке статус DISABLE"
    )
    @GetMapping("/inactivate/{id}")
    public CraftInfoCardRequestDto disableCart(@PathVariable UUID id) throws ModelNotFoundException {
        return CraftInfoCardRequestDto.getDtoFromCraftInfoCard(craftInfoCardService.changeStatus(id, InfoCardStatus.DISABLE));
    }

    @Operation(
            summary = "Сделать карточку активной",
            description = "ставит карточке статус Active"
    )
    @GetMapping("/activate/{id}")
    public CraftInfoCardRequestDto activateCart(@PathVariable UUID id) throws ModelNotFoundException {
        return CraftInfoCardRequestDto.getDtoFromCraftInfoCard(craftInfoCardService.changeStatus(id, InfoCardStatus.ACTIVE));
    }

    @Operation(
            summary = "Карточки по имени автора"
    )
    @GetMapping("/get-by-author/{username}")
    public List<CraftInfoCardRequestDto> getAllByAuthor(@PathVariable String username) throws ModelNotFoundException {
        return craftInfoCardService.getAllByAuthorUsername(username).stream().map(CraftInfoCardRequestDto::getDtoFromCraftInfoCard).collect(Collectors.toList());
    }
}
