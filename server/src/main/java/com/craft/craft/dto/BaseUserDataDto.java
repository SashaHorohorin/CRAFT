package com.craft.craft.dto;

import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class BaseUserDataDto {
    public String firstName;
    public String lastName;
    private String email;
    private String phoneNumber;
    protected String username;

    public static BaseUserDataDto getDtoFromBaseUser(BaseUser user){
        return new BaseUserDataDto(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getUsername());
    }
}
