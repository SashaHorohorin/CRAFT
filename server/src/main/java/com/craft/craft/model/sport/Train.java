package com.craft.craft.model.sport;

import com.craft.craft.model.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@EqualsAndHashCode(exclude="trainers", callSuper = false)
@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Table(indexes = @Index(columnList = "id"))
public class Train extends BaseEntity {

    @NonNull
    @Enumerated(EnumType.STRING)
    private TrainType type;
    @NonNull
    private Date startTrain;
    @NonNull
    private Date endTrain;
    @NonNull
    private int maxParticipant;
    private int nowParticipant = 0;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE/*, CascadeType.REFRESH, CascadeType.DETACH*/})
    @JoinTable(
            name = "trainer_trains",
            joinColumns = {@JoinColumn(name = "train_id")},
            inverseJoinColumns = {@JoinColumn(name = "trainer_id")}
    )

    private Set<Trainer> trainers = new HashSet<>();

}
