package com.craft.craft.model.sport;


import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.BaseUser;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CompetitionPair extends BaseEntity {
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "competition_pair_players",
            joinColumns = {@JoinColumn(name = "competition_pair_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    @Size(max=2)
    private Set<BaseUser> players = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "competition_pair_request_to_join",
            joinColumns = {@JoinColumn(name = "competition_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<BaseUser> requestToJoin = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "competition_pair_request_to_invite",
            joinColumns = {@JoinColumn(name = "competition_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<BaseUser> requestToInvite = new HashSet<>();
    @ManyToOne
    private Competition competition;

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode());
    }

    @PreRemove
    public void preRemove(){
        competition.getCompetitionPairs().remove(this);
        players.forEach(player -> player.getCompetitionPairs().remove(this));
        requestToJoin.forEach(player -> player.getRequestToJoinCompetition().remove(this));
        requestToInvite.forEach(player -> player.getRequestToInviteCompetition().remove(this));
    }
}
