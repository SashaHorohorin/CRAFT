package com.craft.craft.dto;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class CraftInfoCardDto {
    private UUID id;
    private String photoURL;
    private String header;
    private String shortText;
    private String longText;
    private String authorUsername;
    private InfoCardStatus status;

    public static CraftInfoCardDto getDtoFromCraftInfoCard(CraftInfoCard card){
        return new CraftInfoCardDto(
                card.getId(),
                card.getPhotoURL(),
                card.getHeader(),
                card.getShortText(),
                card.getLongText(),
                card.getAuthor().getUsername(),
                card.getStatus()
        );
    }
}
