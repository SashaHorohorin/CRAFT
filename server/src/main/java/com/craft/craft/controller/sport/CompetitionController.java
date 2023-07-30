package com.craft.craft.controller.sport;

import com.craft.craft.dto.CompetitionInProfileResponseDto;
import com.craft.craft.repository.sport.CompetitionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/competition")
@RequiredArgsConstructor
public class CompetitionController {
    private final CompetitionRepo competitionRepo;

    @GetMapping("/get-all")
    public List<CompetitionInProfileResponseDto> getAll(){
       return competitionRepo.findAll().stream().map(CompetitionInProfileResponseDto::getDtoFromCompetition).collect(Collectors.toList());
    }
}
