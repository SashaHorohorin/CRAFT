package com.craft.craft.controller.sport;

import com.craft.craft.dto.sport.TrainCalendarBySportComplexDto;
import com.craft.craft.dto.sport.TrainInfoDto;
import com.craft.craft.dto.sport.TrainUpdateDto;
import com.craft.craft.dto.sport.UserToTrainRequest;
import com.craft.craft.error.exeption.FullTrainException;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.sport.TrainService;
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

    @PostMapping("/{trainId}/add-user")
    public TrainInfoDto addUserToTrain(@PathVariable UUID trainId, @RequestBody UserToTrainRequest username) throws ModelNotFoundException, FullTrainException {
        return TrainInfoDto.getDtoFromTrain(trainService.addUserToTrain(trainId, username.getUsername()));
    }

    @PostMapping("/{trainId}/remove-user")
    public TrainInfoDto removeUserToTrain(@PathVariable UUID trainId, @RequestBody UserToTrainRequest username) throws ModelNotFoundException {
        return TrainInfoDto.getDtoFromTrain(trainService.removeUserFromTrain(trainId, username.getUsername()));
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
