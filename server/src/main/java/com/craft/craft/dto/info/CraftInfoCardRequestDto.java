package com.craft.craft.dto.info;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class CraftInfoCardRequestDto {
    private UUID id;
    private String photoURL;
    private String titleFront;
    private String titleBack;
    private String textFront;
    private String textBack;
    private String authorUsername;
    private InfoCardStatus status;


    public static CraftInfoCardRequestDto getDtoFromCraftInfoCard(CraftInfoCard card){
        return new CraftInfoCardRequestDto(
                card.getId(),
                card.getPhotoURL(),
                card.getTitleFront(),
                card.getTitleBack(),
                card.getTextFront(),
                card.getTextBack(),
                card.getAuthor().getUsername(),
                card.getStatus()
        );
    }
}
