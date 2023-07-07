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

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainerCardDto {

    private String name;
    private String photoURL;
    private String textFront;
    private String textBack;
    private InfoCardStatus status;
    private UUID authorId;

    public static TrainerCardDto getDtoFromTrainer(Trainer trainer){
        return new TrainerCardDto(
                trainer.getName(),
                trainer.getPhotoURL(),
                trainer.getTextFront(),
                trainer.getTextBack(),
                trainer.getStatus(),
                trainer.getAuthor().getId()
        );
    }
}
