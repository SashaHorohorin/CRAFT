package com.craft.craft.model.sport;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.BaseUser;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;


@Entity
@Data
@EqualsAndHashCode(of={"startTrain"}, callSuper = true)
@NoArgsConstructor
@RequiredArgsConstructor
@Table(indexes = @Index(columnList = "id"))
public class Train extends BaseEntity implements ItemInCalendar {
    @NonNull
    @NotNull
    @Enumerated(EnumType.STRING)
    private TrainType type;
    @NonNull
    @NotNull
    private Date startTrain;
    @NonNull
    @NotNull
    private Date endTrain;
    @NonNull
    @NotNull
    private int maxParticipant;
    private int nowParticipant = 0;
    @NonNull
    @NotNull
    @Enumerated(EnumType.STRING)
    private SportComplex sportComplex;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE/*, CascadeType.REFRESH, CascadeType.DETACH*/})
    @JoinTable(
            name = "trainer_trains",
            joinColumns = {@JoinColumn(name = "train_id")},
            inverseJoinColumns = {@JoinColumn(name = "trainer_id")}
    )
    private Set<Trainer> trainers = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "sportsmen_train",
            joinColumns = {@JoinColumn(name = "train_id")},
            inverseJoinColumns = {@JoinColumn(name = "sportsmen_id")}
    )
    private Set<BaseUser> sportsmen = new HashSet<>();

    @PreRemove
    public void preRemove(){
        trainers.forEach(t -> t.getTrains().remove(this));
        sportsmen.forEach(s -> s.getTrains().remove(this));
    }

    @Override
    public ItemInCalendarType getItemType() {
        return ItemInCalendarType.TRAIN;
    }

    @Override
    public Date getStartItem() {
        return startTrain;
    }

    @Override
    public SportComplex getSportComplexOfItem() {
        return sportComplex;
    }
}
