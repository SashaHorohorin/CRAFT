package com.craft.craft.dto;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveRepositoriesAutoConfiguration;

import javax.persistence.CascadeType;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@Data
public class CraftInfoCardDto {
    private String photoURL;
    private String header;
    private String shortText;
    private String longText;
    private String authorUsername;

    public static CraftInfoCardDto getDtoFromCraftInfoCard(CraftInfoCard card){
        return new CraftInfoCardDto(
                card.getPhotoURL(),
                card.getHeader(),
                card.getShortText(),
                card.getLongText(),
                card.getAuthor().getUsername()
        );
    }
}
