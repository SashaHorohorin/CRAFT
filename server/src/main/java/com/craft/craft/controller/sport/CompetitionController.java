package com.craft.craft.controller.sport;

import com.craft.craft.dto.UsernameDto;
import com.craft.craft.dto.sport.CompetitionDto;
import com.craft.craft.error.exeption.FullTrainException;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.sport.CompetitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/competition")
@RequiredArgsConstructor
public class CompetitionController {
    private final CompetitionService competitionService;

    @GetMapping("/get-all")
    public List<CompetitionDto> getAll(){
       return competitionService.findAll().stream().map(CompetitionDto::getDtoFromCompetition).collect(Collectors.toList());
    }
//

    @PostMapping("/{competitionId}/create-pair")
    public CompetitionDto addFirstPlayer(@PathVariable UUID competitionId) throws ModelNotFoundException, FullTrainException {
        return CompetitionDto.getDtoFromCompetition(competitionService.createPair(competitionId).getCompetition());
    }

    @PostMapping("/pair/{competitionPairId}/accept-join-request")
    public CompetitionDto addSecondUserToPairFromRequestJoin(@PathVariable UUID competitionPairId, @RequestBody UsernameDto dto) throws ModelNotFoundException, FullTrainException {
        return CompetitionDto.getDtoFromCompetition(
                competitionService.addSecondUserToPairFromRequestJoin(competitionPairId, dto.getUsername())
                        .getCompetition());
    }

    @PostMapping("/pair/{competitionPairId}/accept-invite-request")
    public CompetitionDto addSecondUserToPairFromRequestInvite(@PathVariable UUID competitionPairId, @RequestBody UsernameDto dto) throws ModelNotFoundException, FullTrainException {
        return CompetitionDto.getDtoFromCompetition(
                competitionService.addSecondUserToPairFromRequestInvite(competitionPairId, dto.getUsername())
                        .getCompetition());
    }

    @GetMapping("/pair/{competitionPairId}/request-to-join")
    public void requestToJoin(@PathVariable UUID competitionPairId) throws ModelNotFoundException, FullTrainException, MessagingException {
        competitionService.requestToJoin(competitionPairId);
    }
    @GetMapping("/pair/{competitionPairId}/request-to-invite/{username}")
    public void requestToInvite(@PathVariable UUID competitionPairId,@PathVariable String username) throws ModelNotFoundException, FullTrainException, MessagingException {
        competitionService.requestToInvite(competitionPairId, username);
    }


//
//    @PostMapping("/{trainId}/remove-user")
//    public TrainInfoDto removeUserToTrain(@PathVariable UUID trainId, @RequestBody UserToTrainRequest username) throws ModelNotFoundException {
//        return TrainInfoDto.getDtoFromTrain(trainService.removeUserFromTrain(trainId, username.getUsername()));
//    }
//
//    @PostMapping("/create")
//    public TrainInfoDto createTrain(@RequestBody TrainUpdateDto trainInfoDto) throws ModelNotFoundException {
//        return TrainInfoDto.getDtoFromTrain(trainService.createTrain(trainInfoDto));
//    }
//
//    @PostMapping("/change/{id}")
//    public TrainInfoDto changeTrain(@RequestBody TrainUpdateDto trainInfoDto, @PathVariable UUID id) throws ModelNotFoundException {
//        return TrainInfoDto.getDtoFromTrain(trainService.changeTrain(id,trainInfoDto));
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteTrain(@PathVariable UUID id){
//        trainService.deleteTrain(id);
//    }
}
