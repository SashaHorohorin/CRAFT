package com.craft.craft.controller;

import com.craft.craft.dto.TrainerCardDto;
import com.craft.craft.dto.TrainerDto;
import com.craft.craft.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/trainer")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @GetMapping("/get-all")
    public List<TrainerDto> getAll(){
        return trainerService.getAll().stream().map(TrainerDto::getDtoFromTrainer).collect(Collectors.toList());
    }

}
