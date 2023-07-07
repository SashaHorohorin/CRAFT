package com.craft.craft.model.user;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.sport.Trainer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private List<Trainer> createdTrainers;


    public Admin(String firstName,String lastName,String email,String phoneNumber,String password){
        super(firstName, lastName, email, phoneNumber, password);
        Role adminRole = new Role(RoleName.ADMIN);
        Role baseRole = new Role(RoleName.BASE);
        this.getRoles().add(adminRole);
        this.getRoles().add(baseRole);
    }
}
