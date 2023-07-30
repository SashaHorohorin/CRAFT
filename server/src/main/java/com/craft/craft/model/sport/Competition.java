package com.craft.craft.model.sport;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.BaseUser;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Data
public class Competition extends BaseEntity {
    @NonNull
    @Enumerated(EnumType.STRING)
    private SportComplex sportComplex;
    private String title;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "sportsmen_competition",
            joinColumns = {@JoinColumn(name = "competition_id")},
            inverseJoinColumns = {@JoinColumn(name = "sportsmen_id")}
    )
    private Set<BaseUser> sportsmen = new HashSet<>();
}
