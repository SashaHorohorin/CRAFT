package com.craft.craft.model.info;


import com.craft.craft.model.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class News extends BaseEntity {

    @NotNull
    @NonNull
    @Enumerated(EnumType.STRING)
    private NewsType type;
    @NotNull
    @NonNull
    private String title;
    private String smallTitle;
    private Date eventDate;
    private String textUnderDate;
    @NotNull
    @NonNull
    @Column(length = 2048)
    private String text;
    private String photoUrl;

}
