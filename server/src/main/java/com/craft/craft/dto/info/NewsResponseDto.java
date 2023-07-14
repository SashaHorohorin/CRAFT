package com.craft.craft.dto.info;

import com.craft.craft.model.info.News;
import com.craft.craft.model.info.NewsType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsResponseDto {
    private UUID id;
    private NewsType type;
    private String title;
    private String smallTitle;
    private Date eventDate;
    private String textUnderDate;
    private String text;
    private String photoUrl;
    private Date createdDate;

    public static NewsResponseDto getDtoFromNews(News news){
        return new NewsResponseDto(
                news.getId(),
                news.getType(),
                news.getTitle(),
                news.getTextUnderTitle(),
                news.getEventDate(),
                news.getTextUnderDate(),
                news.getText(),
                news.getPhotoUrl(),
                news.getCreated()
        );
    }
}
