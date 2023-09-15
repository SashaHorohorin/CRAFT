package com.craft.craft.dto;

import com.craft.craft.dto.info.PriceSubscriptionDto;
import com.craft.craft.dto.sport.competiton.CompetitionDto;
import com.craft.craft.dto.sport.competiton.CompetitionPairDto;
import com.craft.craft.dto.sport.competiton.CompetitionRequestInProfileDto;
import com.craft.craft.dto.sport.competiton.RequestTypeDto;
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
    private List<CompetitionRequestInProfileDto> fromRequestsToInvite;
    private List<CompetitionRequestInProfileDto> fromRequestsToJoin;
    private List<CompetitionRequestInProfileDto> toRequestToInvite;
    private List<CompetitionRequestInProfileDto> toRequestToJoin;
    private Integer rating;
    private Integer labId;
    private PriceSubscriptionDto priceSubscription;


    public static ProfileBaseUserResponseDto getDtoFromBaseUser(BaseUser user) {
        List<CompetitionRequestInProfileDto> fromInvite = new ArrayList<>();
        List<CompetitionRequestInProfileDto> toInvite = new ArrayList<>();
        List<CompetitionRequestInProfileDto> fromJoin = new ArrayList();
        List<CompetitionRequestInProfileDto> toJoin = new ArrayList();
        user.getCompetitionPairs().forEach(r -> {
                    Set<BaseUser> ri = r.getRequestToInvite();
                    ri.forEach(u -> {
                        fromInvite.add(CompetitionRequestInProfileDto.getRequestDto(
                                r.getId(),
                                u,
                                r.getCompetition(),
                                RequestTypeDto.INVITE
                        ));
                    });

                }
        );
        user.getRequestToInviteCompetition().forEach(r -> {
                    toInvite.add(
                            CompetitionRequestInProfileDto.getRequestDto(
                                    r.getId(),
                                    r.getPlayers().iterator().next(),
                                    r.getCompetition(),
                                    RequestTypeDto.INVITE
                            ));
                }
        );

        user.getCompetitionPairs().forEach(r -> {
                    r.getRequestToJoin().forEach(pj -> {
                        toJoin.add(CompetitionRequestInProfileDto.getRequestDto(
                                r.getId(),
                                pj,
                                r.getCompetition(),
                                RequestTypeDto.JOIN
                        ));
                    });

                }
        );
        user.getRequestToJoinCompetition().forEach(r -> {
            fromJoin.add(
                    CompetitionRequestInProfileDto.getRequestDto(
                            r.getId(),
                            r.getPlayers().iterator().next(),
                            r.getCompetition(),
                            RequestTypeDto.JOIN
                    ));
        });

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
                fromInvite,
                fromJoin,
                toInvite,
                toJoin,
                user.getRating(),
                user.getLabId(),
                PriceSubscriptionDto.getDtoFromPriceUser(user.getPrice())
        );
    }
}
