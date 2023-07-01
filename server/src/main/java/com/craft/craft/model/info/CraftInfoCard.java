package com.craft.craft.model.info;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CraftInfoCard extends BaseEntity {
    private String photoURL;
    private String header;
    private String shortText;
    private String longText;
    @Enumerated(EnumType.STRING)
    private InfoCardStatus status;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private BaseUser author;
}
