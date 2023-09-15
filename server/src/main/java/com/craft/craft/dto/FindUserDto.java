package com.craft.craft.dto;

import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindUserDto {
    private String firstName;
    private String lastName;
    private String username;
    private boolean haveFirstTrain;

    public static FindUserDto getDtoFromUser(BaseUser user){
        return new FindUserDto(
            user.getFirstName(),
            user.getLastName(),
            user.getUsername(),
            user.isHaveFirstTrain()
        );
    }
}
