package com.craft.craft.dto;

import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.model.user.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Data
public class BaseUserDto {

    public String firstName;
    public String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    protected String username;
    private Status status;
    private List<String> roles;
    private List<UUID> infoCardsId;

    public static BaseUserDto getDtoFromBaseUser(BaseUser user){
        return new BaseUserDto (
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getPassword(),
                user.getUsername(),
                user.getStatus(),
                user.getRoles().stream().map((role) -> role.getName().toString()).collect(Collectors.toList()),
                user.getInfoCards().stream().map(CraftInfoCard::getId).collect(Collectors.toList())
        );
    }
}
