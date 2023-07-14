package com.craft.craft.dto.info;

import com.craft.craft.model.info.InfoCardStatus;
import lombok.Data;

@Data
public class CraftInfoCardUpdateDto {
    private String photoURL;
    private String titleFront;
    private String titleBack;
    private String textFront;
    private String textBack;
    private InfoCardStatus status;
}
