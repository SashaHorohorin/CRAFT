package com.craft.craft.model.info;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.Admin;
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
    private String titleFront;
    private String titleBack;
    @Column(length = 1024)
    private String textFront;
    @Column(length = 1024)
    private String textBack;
    @Enumerated(EnumType.STRING)
    private InfoCardStatus status;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Admin author;
}
