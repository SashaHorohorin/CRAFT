package com.craft.craft.dto.sport;

import com.craft.craft.dto.sport.competiton.CompetitionPairDto;
import com.craft.craft.dto.sport.train.TrainInProfileResponseDto;
import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProfileBaseUserResponseDto {
    public String firstName;
    public String lastName;
    private String email;
    private String phoneNumber;
    protected String username;
    private List<TrainInProfileResponseDto> trains;
    private List<CompetitionPairDto> competitions;
    private Integer rating;
    private Integer labId;

    public static ProfileBaseUserResponseDto getDtoFromBaseUser(BaseUser user){
        return new ProfileBaseUserResponseDto(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getUsername(),
                user.getTrains().stream().map(TrainInProfileResponseDto::getDtoFromTrain).collect(Collectors.toList()),
                user.getCompetitionPairs().stream().map(CompetitionPairDto::getDtoFromCompetitionPair).collect(Collectors.toList()),
                user.getRating(),
                user.getLabId()
        );
    }
}
