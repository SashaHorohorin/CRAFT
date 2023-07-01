package com.craft.craft.model.user;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.info.TrainerInfoCard;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Admin extends BaseUser {

    @OneToMany(mappedBy = "author", cascade=CascadeType.ALL)
    @JsonIgnoreProperties({"author"})
    private List<CraftInfoCard> infoCards;

    @OneToMany(mappedBy = "author", cascade=CascadeType.ALL)
    @JsonIgnoreProperties({"author"})
    private List<TrainerInfoCard> infoTrainerCard;


    public Admin(String firstName,String lastName,String email,String phoneNumber,String password){
        super(firstName, lastName, email, phoneNumber, password, new ArrayList<>());
        Role adminRole = new Role(RoleName.ADMIN);
        Role baseRole = new Role(RoleName.BASE);
        this.getRoles().add(adminRole);
        this.getRoles().add(baseRole);
    }
}
