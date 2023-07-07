package com.craft.craft.dto;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.Admin;
import com.craft.craft.model.user.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Data
public class AdminDto {

    public String firstName;
    public String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    protected String username;
    private Status status;
    private List<String> roles;
    private List<UUID> infoCards;
    private List<UUID> infoTrainerCard;

    public static AdminDto getDtoFromAdmin(Admin user){
        return new AdminDto (
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getPassword(),
                user.getUsername(),
                user.getStatus(),
                user.getRoles().stream().map((role) -> role.getName().toString()).collect(Collectors.toList()),
                user.getInfoCards().stream().map(BaseEntity::getId).collect(Collectors.toList()),
                user.getCreatedTrainers().stream().map(BaseEntity::getId).collect(Collectors.toList())
        );
    }
}
