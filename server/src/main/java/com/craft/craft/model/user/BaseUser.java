package com.craft.craft.model.user;


import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.info.Price;
import com.craft.craft.model.info.PriceUser;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionPair;
import com.craft.craft.model.sport.Train;
import lombok.*;
import org.hibernate.validator.constraints.Length;

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
@EqualsAndHashCode(of={"email"}, callSuper = true)
//@EqualsAndHashCode(exclude = {"roles", "trains", "competitionPairs","requestToJoinCompetition","requestToInviteCompetition","rating","labId"}, callSuper = true)
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
    @Column(name = "phoneNumber")
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
            name = "competition_pair_players",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "competition_pair_id")}
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
    @OneToOne
    @JoinColumn(name = "price", referencedColumnName = "id")
    private PriceUser price;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(
            name = "order_price_user",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "price_id")}
    )
    private Set<Price> ordersPrice = new HashSet<>();

    private Integer rating;
    private Integer labId;
    private boolean agreementDataProcessing;
    private boolean agreementMailing;
    private String activationCode;
    private boolean haveFirstTrain = false;
    @Length(min=6, max=6)
    private String changePasswordCode;
    private Boolean canChangePassword;


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


    @Override
    public String toString() {
        return "BaseUser{" +
                "username='" + username + '\'' +
                '}';
    }
}
