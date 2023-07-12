package com.craft.craft.controller;

import com.craft.craft.dto.AddUserToTrainRequestDto;
import com.craft.craft.dto.TrainCalendarBySportComplexDto;
import com.craft.craft.dto.TrainInfoDto;
import com.craft.craft.dto.TrainUpdateDto;
import com.craft.craft.error.exeption.FullTrainException;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.TrainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/train")
@RequiredArgsConstructor
public class TrainController {

    private final TrainService trainService;

    @GetMapping("/get-calendar-by-sport-complex")
    public TrainCalendarBySportComplexDto getTrainCalendarBySportComplex() throws ModelNotFoundException {
        return trainService.getTrainCalendarOnThisWeek();
    }

    @PostMapping("/add-user")
    public TrainInfoDto addUserToTrain(@RequestBody AddUserToTrainRequestDto requestDto) throws ModelNotFoundException, FullTrainException {
        return TrainInfoDto.getDtoFromTrain(trainService.addUserToTrain(requestDto.getTrainId(), requestDto.getUsername()));
    }

    @PostMapping("/remove-user")
    public TrainInfoDto removeUserToTrain(@RequestBody AddUserToTrainRequestDto requestDto) throws ModelNotFoundException {
        return TrainInfoDto.getDtoFromTrain(trainService.removeUserFromTrain(requestDto.getTrainId(), requestDto.getUsername()));
    }

    @PostMapping("/create")
    public TrainInfoDto createTrain(@RequestBody TrainUpdateDto trainInfoDto) throws ModelNotFoundException {
        return TrainInfoDto.getDtoFromTrain(trainService.createTrain(trainInfoDto));
    }

    @PostMapping("/change/{id}")
    public TrainInfoDto changeTrain(@RequestBody TrainUpdateDto trainInfoDto, @PathVariable UUID id) throws ModelNotFoundException {
        return TrainInfoDto.getDtoFromTrain(trainService.changeTrain(id,trainInfoDto));
    }

    @DeleteMapping("/{id}")
    public void deleteTrain(@PathVariable UUID id){
        trainService.deleteTrain(id);
    }
}
