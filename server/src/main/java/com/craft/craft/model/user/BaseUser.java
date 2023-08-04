package com.craft.craft.model.user;


import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionPair;
import com.craft.craft.model.sport.Train;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@Entity
@Table(name = "baseuser")
@Data
@EqualsAndHashCode(exclude = {"roles", "trains", "competitionPairs","requestToJoinCompetition","requestToInviteCompetition","rating","labId"}, callSuper = true)
@NoArgsConstructor
@RequiredArgsConstructor
@Cacheable(false)
@Inheritance(
        strategy = InheritanceType.JOINED
)
public class BaseUser extends BaseEntity {
    @NonNull
    @NotNull
    @NotBlank(message = "Please enter your first name")
    private String firstName;
    @NonNull
    @NotNull
    @NotBlank(message = "Please enter your last name")
    private String lastName;
    @NonNull
    @Email(message = "Please provide a valid email address")
    @NotNull
    @NotBlank(message = "Please enter your phone number")
    @Column(name = "email", unique = true)
    private String email;
    @NonNull
    @NotNull
    @NotBlank(message = "Please enter your phone number")
    @Pattern(regexp = "^((8|\\+7)\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2})$")
    @Column(name = "phoneNumber", unique = true)
    private String phoneNumber;
    private String photoUrl;
    @NonNull
    @NotNull
    @NotBlank(message = "Please enter your password number")
    private String password;
    @Column(unique = true)
    protected String username;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "user_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> roles = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "sportsmen_train",
            joinColumns = {@JoinColumn(name = "sportsmen_id")},
            inverseJoinColumns = {@JoinColumn(name = "train_id")}
    )
    private Set<Train> trains = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "competition_players",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "competition_id")}
    )
    private Set<CompetitionPair> competitionPairs;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "competition_pair_request_to_join",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "competition_id")}
    )
    private Set<CompetitionPair> requestToJoinCompetition;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(
            name = "competition_pair_request_to_invite",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "competition_id")}
    )
    private Set<CompetitionPair> requestToInviteCompetition;

    private Integer rating;
    private Integer labId;
    private boolean agreementDataProcessing;
    private boolean agreementMailing;
    private String activationCode;


    @PrePersist
    public void generateUsernameAndSetStatus() {
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        this.username = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }


}
