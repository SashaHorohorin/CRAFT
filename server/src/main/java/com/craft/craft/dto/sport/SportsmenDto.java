package com.craft.craft.dto.sport;

import com.craft.craft.model.user.BaseUser;
import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SportsmenDto {
    private UUID id;
    private String firstName;
    private String username;
    private String lastName;
    private String photoUrl;
    private Integer rating;

    public static SportsmenDto getDtoFromBaseUser(BaseUser user){
        if(user == null) return null;
        return new SportsmenDto(
                user.getId(),
                user.getFirstName(),
                user.getUsername(),
                user.getLastName(),
                user.getPhotoUrl(),
                user.getRating()
        );
    }
}
