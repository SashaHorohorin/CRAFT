package com.craft.craft.dto;

import com.craft.craft.model.sport.Train;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainInfoDto {

    private String type;
    private Date startTrain;
    private Date endTrain;
    private int maxParticipant;
    private int nowParticipant;
    @JsonIgnoreProperties({"authorId", "trainsIds","status"})
    private Set<TrainerDto> trainers = new HashSet<>();

    public static TrainInfoDto getDtoFromTrain(Train train) {
        return new TrainInfoDto(
            train.getType().name(),
            train.getStartTrain(),
            train.getEndTrain(),
            train.getMaxParticipant(),
            train.getNowParticipant(),
            train.getTrainers().stream().map(TrainerDto::getDtoFromTrainer).collect(Collectors.toSet())
        );
    }
}
