package com.craft.craft.model.sport;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.BaseUser;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(of="startCompetition", callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Data
public class Competition extends BaseEntity implements ItemInCalendar {
    @NonNull
    @NotNull
    @Enumerated(EnumType.STRING)
    private SportComplex sportComplex;
    @NonNull
    @NotNull
    @Enumerated(EnumType.STRING)
    private CompetitionType type;
    @NonNull
    @NotNull
    private Date startCompetition;
    private Date endCompetition;
    @NonNull
    @NotNull
    private int maxPair;
    private int nowPair = 0;
    @NotNull
    @Enumerated(EnumType.STRING)
    private CompetitionStatus status;
    @Column(length = 1024)
    private String info;
    private CategoryOfCompetition category;
    private Integer ratingUp;
    private Integer ratingDown;
//
//    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
//    @JoinTable(
//            name = "sportsmen_competition",
//            joinColumns = {@JoinColumn(name = "competition_id")},
//            inverseJoinColumns = {@JoinColumn(name = "sportsmen_id")}
//    )
//    private Set<BaseUser> sportsmen = new HashSet<>();

    @OneToMany(mappedBy = "competition", fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    private Set<CompetitionPair> competitionPairs = new HashSet<>();

    @Override
    public ItemInCalendarType getItemType() {
        return ItemInCalendarType.COMPETITION;
    }

    @Override
    public Date getStartItem() {
        return this.startCompetition;
    }

    @Override
    public SportComplex getSportComplexOfItem() {
        return sportComplex;
    }

    @Override
    public String toString() {
        return "Competition{" +
                "type=" + type +
                '}';
    }
}
