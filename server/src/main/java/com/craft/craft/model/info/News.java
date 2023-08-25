package com.craft.craft.model.info;


import com.craft.craft.model.BaseEntity;
import lombok.*;

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
@AllArgsConstructor
public class News extends BaseEntity {

    @NotNull
    @NonNull
    @Enumerated(EnumType.STRING)
    private NewsType type;
    @NotNull
    @NonNull
    private String title;
    private String textUnderTitle;
    private String mainTitle;
    private Date eventDate;
    private String textUnderDate;
    @NotNull
    @NonNull
    @Column(length = 2048)
    private String text;
    private String photoUrl;

}
