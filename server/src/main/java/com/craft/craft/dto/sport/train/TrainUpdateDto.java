package com.craft.craft.dto.sport.train;

import com.craft.craft.model.sport.SportComplex;
import com.craft.craft.model.sport.TrainType;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
public class TrainUpdateDto {
    @NotBlank(message = "type должен быть представлен")
    @NotNull(message = "type не может быть null")
    private TrainType type;
    @NotNull(message = "maxParticipant не может быть null")
    @NotBlank(message = "maxParticipant должен быть представлен")
    private int maxParticipant;
    @NotNull(message = "trainersUsername не может быть null")
    @NotBlank(message = "trainersUsername должен быть представлен")
    private Set<UUID> trainersId = new HashSet<>();
    @NotNull(message = "startTrain не может быть null")
    @NotBlank(message = "startTrain должен быть представлен")
    private Date startTrain;
    @NotNull(message = "endTrain не может быть null")
    @NotBlank(message = "endTrain должен быть представлен")
    private Date endTrain;
    @NotNull(message = "sportCompex не может быть null")
    @NotBlank(message = "sportCompex должен быть представлен")
    private SportComplex sportCompex;


}
