package com.craft.craft.dto;

import com.craft.craft.dto.sport.competiton.CompetitionDto;
import com.craft.craft.dto.sport.competiton.CompetitionRequestInProfileDto;
import com.craft.craft.dto.sport.train.TrainInProfileResponseDto;
import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
    private List<CompetitionDto> competitions;
    private List<CompetitionRequestInProfileDto> requestToInvite;
    private List<CompetitionRequestInProfileDto> requestToJoin;
    private Integer rating;
    private Integer labId;

    public static ProfileBaseUserResponseDto getDtoFromBaseUser(BaseUser user) {
        List<CompetitionRequestInProfileDto> invite = new ArrayList<>();
        List<CompetitionRequestInProfileDto> join = new ArrayList();
        user.getCompetitionPairs().forEach(r -> {
                    Set<BaseUser> ri = r.getRequestToInvite();
                    ri.forEach(u -> {
                        invite.add(CompetitionRequestInProfileDto.getRequestDto(
                                r.getId(),
                                u,
                                r.getCompetition()
                        ));
                    });

                }
        );
        user.getCompetitionPairs().forEach(r -> {
                    r.getRequestToJoin().forEach(pj -> {
                        join.add(CompetitionRequestInProfileDto.getRequestDto(
                                r.getId(),
                                pj,
                                r.getCompetition()
                        ));
                    });

                }
        );
        return new ProfileBaseUserResponseDto(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getUsername(),
                user.getTrains().stream().map(TrainInProfileResponseDto::getDtoFromTrain).collect(Collectors.toList()),
                user.getCompetitionPairs().stream().map(pair ->
                        CompetitionDto.getDtoFromCompetition(pair.getCompetition())
                ).collect(Collectors.toList()),
                invite,
                join,
                user.getRating(),
                user.getLabId()
        );
    }
}
