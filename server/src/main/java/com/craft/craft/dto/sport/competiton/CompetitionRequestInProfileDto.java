package com.craft.craft.dto.sport.competiton;

import com.craft.craft.dto.sport.SportsmenDto;
import com.craft.craft.model.sport.CategoryOfCompetition;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionType;
import com.craft.craft.model.sport.SportComplex;
import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompetitionRequestInProfileDto {

    private UUID pairId;
    private SportsmenDto request;
    private UUID competitionId;
    private SportComplex sportComplex;
    private CompetitionType type;
    private Date startCompetition;
    private int maxParticipant;
    private int nowParticipant;
    private RequestTypeDto typeOfRequest;
    private CategoryOfCompetition category;

    public static CompetitionRequestInProfileDto getRequestDto(UUID pairId, BaseUser user, Competition competition, RequestTypeDto typeOfRequest) {
        return new CompetitionRequestInProfileDto(
                pairId,
                SportsmenDto.getDtoFromBaseUser(user),
                competition.getId(),
                competition.getSportComplex(),
                competition.getType(),
                competition.getStartCompetition(),
                competition.getMaxPair(),
                competition.getNowPair(),
                typeOfRequest,
                competition.getCategory()
        );
    }

}
