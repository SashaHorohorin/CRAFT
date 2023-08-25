package com.craft.craft.dto.info;

import com.craft.craft.model.info.NewsType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNewsDto {
    private NewsType type;
    private String title;
    private String textUnderTitle;
    private Date eventDate;
    private String textUnderDate;
    private String text;
    private String photoUrl;
}
