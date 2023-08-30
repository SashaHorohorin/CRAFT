package com.craft.craft.controller.sport;

import com.craft.craft.dto.sport.train.TrainCalendarBySportComplexDto;
import com.craft.craft.dto.sport.train.TrainInfoDto;
import com.craft.craft.dto.sport.train.TrainUpdateDto;
import com.craft.craft.dto.sport.train.UserToTrainRequest;
import com.craft.craft.error.exeption.FullTrainException;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.sport.TrainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @GetMapping("/get-all")
    public List<TrainInfoDto> getAll(){
        return trainService.findAll().stream().map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
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
