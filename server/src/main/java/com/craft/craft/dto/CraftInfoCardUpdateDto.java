package com.craft.craft.dto;

import com.craft.craft.model.info.InfoCardStatus;
import lombok.Data;

@Data
public class CraftInfoCardUpdateDto {
    private String photoURL;
    private String header;
    private String shortText;
    private String longText;
    private InfoCardStatus status;
}
