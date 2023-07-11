package com.craft.craft.dto;

import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SportsmenDto {
    private UUID id;
    private String firstName;
    private String lastName;

    public static SportsmenDto getDtoFromBaseUser(BaseUser user){
        return new SportsmenDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName()
        );
    }
}
