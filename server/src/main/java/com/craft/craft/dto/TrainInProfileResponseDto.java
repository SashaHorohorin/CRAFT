package com.craft.craft.dto;


import com.craft.craft.model.sport.Train;
import com.craft.craft.model.sport.TrainType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TrainInProfileResponseDto {

    private TrainType type;
    private Date startTrain;
    private Date endTrain;
    private List<SportsmenDto> sportsmens;

    public static TrainInProfileResponseDto getDtoFromTrain(Train train){
        return new TrainInProfileResponseDto(
            train.getType(),
            train.getStartTrain(),
            train.getEndTrain(),
            train.getSportsmen().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toList())
        );
    }
}
