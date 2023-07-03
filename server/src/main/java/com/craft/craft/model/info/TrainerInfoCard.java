package com.craft.craft.model.info;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class TrainerInfoCard extends BaseEntity {
    @NonNull
    private String name;
    @NonNull
    private String photoURL;
    @NonNull
    private String textFront;
    @NonNull
    private String textBack;
    @NonNull
    @Enumerated(EnumType.STRING)
    private InfoCardStatus status;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private BaseUser author;
}
