package com.craft.craft.model.user;


import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.info.CraftInfoCard;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Entity
@Table(name="baseuser")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Cacheable(false)
public class BaseUser extends BaseEntity {
    @NonNull
    @NotNull
    @NotBlank(message="Please enter your first name")
    public String firstName;
    @NonNull
    @NotNull
    @NotBlank(message="Please enter your last name")
    public String lastName;
    @NonNull
    @Email(message="Please provide a valid email address")
    @NotNull
    @NotBlank(message="Please enter your phone number")
    @Column(name="email",unique = true)
    private String email;
    @NonNull
    @NotNull
    @NotBlank(message="Please enter your phone number")
    @Pattern(regexp = "^((8|\\+7)\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2})$")
    @Column(name="phoneNumber",unique = true)
    private String phoneNumber;
    @NonNull
    @NotNull
    @NotBlank(message="Please enter your password number")
    private String password;
    @Column(unique = true)
    protected String username;
    @Enumerated(EnumType.STRING)
    private Status status;
    @NonNull
    @ManyToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private List<Role> roles;
    @OneToMany(mappedBy = "author", cascade=CascadeType.ALL)
    @JsonIgnoreProperties({"author"})
    private List<CraftInfoCard> infoCards;



    @PrePersist
    public void generateUsernameAndSetStatus(){
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        this.username = generatedString;
        this.status = Status.ACTIVE;
    }
}
