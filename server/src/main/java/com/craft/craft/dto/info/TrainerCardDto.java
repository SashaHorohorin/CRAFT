package com.craft.craft.dto.info;

import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.sport.Trainer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainerCardDto {

    private String name;
    private String photoURL;
    private String textFront;
    private String textBack;
    private InfoCardStatus status;
    //private UUID authorId;

    public static TrainerCardDto getDtoFromTrainer(Trainer trainer){
        return new TrainerCardDto(
                trainer.getName(),
                trainer.getPhotoURL(),
                trainer.getTextFront(),
                trainer.getTextBack(),
                trainer.getStatus()
               // trainer.getAuthor().getId()
        );
    }
}
