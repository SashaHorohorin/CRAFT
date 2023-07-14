package com.craft.craft.dto.info;

import com.craft.craft.model.info.InfoCardStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CraftInfoCardUpdateDto {
    private String photoURL;
    private String titleFront;
    private String titleBack;
    private String textFront;
    private String textBack;
    private InfoCardStatus status;
}
