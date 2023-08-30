package com.craft.craft.dto.sport.train;

import com.craft.craft.dto.sport.SportsmenDto;
import com.craft.craft.dto.sport.TrainerDto;
import com.craft.craft.model.sport.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.*;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainInfoDto implements ItemInCalendar {

    private UUID id;
    private TrainType type;
    private Date startTrain;
    private Date endTrain;
    private SportComplex sportComplex;
    private int maxParticipant;
    private int nowParticipant;
    @JsonIgnoreProperties({"authorId", "trainsIds", "status"})
    private Set<TrainerDto> trainers = new HashSet<>();
    private Set<SportsmenDto> sportsmens = new HashSet<>();
    @NonNull
    private ItemInCalendarType itemType;

    public static TrainInfoDto getDtoFromTrain(Train train) {
        return new TrainInfoDto(
                train.getId(),
                train.getType(),
                train.getStartTrain(),
                train.getEndTrain(),
                train.getSportComplex(),
                train.getMaxParticipant(),
                train.getNowParticipant(),
                train.getTrainers().stream().map(TrainerDto::getDtoFromTrainer).collect(Collectors.toSet()),
                train.getSportsmen().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                ItemInCalendarType.TRAIN
        );
    }

    @Override
    public ItemInCalendarType getItemType() {
        return ItemInCalendarType.TRAIN;
    }

    @Override
    public Date getStartItem() {
        return startTrain;
    }

    @Override
    public SportComplex getSportComplexOfItem() {
        return sportComplex;
    }
}
