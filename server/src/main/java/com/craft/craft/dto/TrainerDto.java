package com.craft.craft.dto;

import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.sport.Train;
import com.craft.craft.model.sport.Trainer;
import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainerDto {

    private String name;
    private String photoURL;
    private InfoCardStatus status;
    private UUID authorId;
    private List<UUID> trainsIds;


    public static TrainerDto getDtoFromTrainer(Trainer trainer){
        return new TrainerDto(
                trainer.getName(),
                trainer.getPhotoURL(),
                trainer.getStatus(),
                trainer.getAuthor().getId(),
                trainer.getTrains().stream().map(Train::getId).collect(Collectors.toList())
        );
    }
}