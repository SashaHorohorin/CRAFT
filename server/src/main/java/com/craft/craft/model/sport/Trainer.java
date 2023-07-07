package com.craft.craft.model.sport;


import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.user.BaseUser;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(exclude = "trains",callSuper = true)
@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Trainer extends BaseEntity {

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
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    private BaseUser author;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE/*, CascadeType.REFRESH, CascadeType.DETACH*/})
    @JoinTable(
            name = "trainer_trains",
            joinColumns = {@JoinColumn(name = "trainer_id")},
            inverseJoinColumns = {@JoinColumn(name = "train_id")}
    )
    private Set<Train> trains = new HashSet<>();

}
