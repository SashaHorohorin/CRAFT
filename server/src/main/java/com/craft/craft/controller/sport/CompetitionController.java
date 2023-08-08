package com.craft.craft.controller.sport;

import com.craft.craft.dto.UsernameDto;
import com.craft.craft.dto.sport.competiton.CompetitionDto;
import com.craft.craft.dto.sport.competiton.CreateCompetitionDto;
import com.craft.craft.dto.sport.competiton.UpdateCompetitionDto;
import com.craft.craft.error.exeption.FullTrainException;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.sport.CompetitionPair;
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
    public List<CompetitionDto> getAll() {
        return competitionService.findAllActive().stream().map(CompetitionDto::getDtoFromCompetition).collect(Collectors.toList());
    }

    @PostMapping("/{competitionId}/create-and-invite")
    public CompetitionDto createPairAndSetInvite(@PathVariable UUID competitionId, @RequestBody UsernameDto secondPlayer) throws ModelNotFoundException, FullTrainException, MessagingException {
        CompetitionPair pair = competitionService.createPair(competitionId);
        return CompetitionDto.getDtoFromCompetition(competitionService.requestToInviteIntoPair(pair.getId(), secondPlayer.getUsername()).getCompetition());
    }

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
    public CompetitionDto addSecondUserToPairFromRequestInvite(@PathVariable UUID competitionPairId, @RequestBody UsernameDto dto) throws ModelNotFoundException {
        return CompetitionDto.getDtoFromCompetition(
                competitionService.addSecondUserToPairFromRequestInvite(competitionPairId, dto.getUsername())
                        .getCompetition());
}

    @GetMapping("/pair/{competitionPairId}/request-to-join")
    public CompetitionDto requestToJoin(@PathVariable UUID competitionPairId) throws ModelNotFoundException {
        return CompetitionDto.getDtoFromCompetition(
                competitionService.requestToJoinIntoPair(competitionPairId)
                        .getCompetition());
    }

    @GetMapping("/pair/{competitionPairId}/request-to-invite/{username}")
    public void requestToInvite(@PathVariable UUID competitionPairId, @PathVariable String username) throws ModelNotFoundException, MessagingException {
        competitionService.requestToInviteIntoPair(competitionPairId, username);
    }

    @GetMapping("/{id}")
    public CompetitionDto getById(@PathVariable UUID id) throws ModelNotFoundException {
        return CompetitionDto.getDtoFromCompetition(competitionService.findById(id));
    }


    @PostMapping("/create")
    public CompetitionDto createCompetition(@RequestBody CreateCompetitionDto dto) {
        return CompetitionDto.getDtoFromCompetition(competitionService.createCompetition(dto));
    }
    @PostMapping("/update/{id}")
    public CompetitionDto updateCompetition(@PathVariable UUID id, @RequestBody UpdateCompetitionDto dto) throws ModelNotFoundException {
        return  CompetitionDto.getDtoFromCompetition(competitionService.updateCompetition(id, dto));
    }
    @PostMapping("/delete/{id}")
    public boolean deleteCompetition(@PathVariable UUID id) {
        return competitionService.deleteCompetition(id);
    }

//
//    @PostMapping("/{trainId}/remove-user")
//    public TrainInfoDto removeUserToTrain(@PathVariable UUID trainId, @RequestBody UserToTrainRequest username) throws ModelNotFoundException {
//        return TrainInfoDto.getDtoFromTrain(trainService.removeUserFromTrain(trainId, username.getUsername()));
//    }
//

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
