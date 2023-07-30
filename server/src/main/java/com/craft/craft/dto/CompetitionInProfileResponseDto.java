package com.craft.craft.dto;

import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionType;
import com.craft.craft.model.sport.SportComplex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompetitionInProfileResponseDto {

    private UUID id;
    private SportComplex sportComplex;
    private CompetitionType type;
    private Date startCompetition;
    private Date endCompetition;
    private int maxParticipant;
    private int nowParticipant;
    private Set<SportsmenDto> sportsmen;

    public static CompetitionInProfileResponseDto getDtoFromCompetition(Competition competition){
        return new CompetitionInProfileResponseDto(
                competition.getId(),
                competition.getSportComplex(),
                competition.getType(),
                competition.getStartCompetition(),
                competition.getEndCompetition(),
                competition.getMaxParticipant(),
                competition.getNowParticipant(),
                competition.getSportsmen().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet())
        );
    }
}
