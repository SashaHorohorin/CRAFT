package com.craft.craft.dto;

import com.craft.craft.model.sport.SportComplex;
import com.craft.craft.model.sport.Train;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainInfoDto {

    private UUID id;
    private String type;
    private Date startTrain;
    private Date endTrain;
    private SportComplex sportComplex;
    private int maxParticipant;
    private int nowParticipant;
    @JsonIgnoreProperties({"authorId", "trainsIds", "status"})
    private Set<TrainerDto> trainers = new HashSet<>();
    private Set<SportsmenDto> sportsmens = new HashSet<>();

    public static TrainInfoDto getDtoFromTrain(Train train) {
        return new TrainInfoDto(
                train.getId(),
                train.getType().name(),
                train.getStartTrain(),
                train.getEndTrain(),
                train.getSportComplex(),
                train.getMaxParticipant(),
                train.getNowParticipant(),
                train.getTrainers().stream().map(TrainerDto::getDtoFromTrainer).collect(Collectors.toSet()),
                train.getSportsmen().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet())
        );
    }
}
