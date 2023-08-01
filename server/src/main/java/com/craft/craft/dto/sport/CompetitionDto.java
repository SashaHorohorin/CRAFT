package com.craft.craft.dto.sport;

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
public class CompetitionDto {

    private UUID id;
    private SportComplex sportComplex;
    private CompetitionType type;
    private Date startCompetition;
    private Date endCompetition;
    private int maxParticipant;
    private int nowParticipant;
    private Set<CompetitionPairDto> competitionPairs;

    public static CompetitionDto getDtoFromCompetition(Competition competition){
        return new CompetitionDto(
                competition.getId(),
                competition.getSportComplex(),
                competition.getType(),
                competition.getStartCompetition(),
                competition.getEndCompetition(),
                competition.getMaxPair(),
                competition.getNowPair(),
                competition.getCompetitionPairs().stream().map(CompetitionPairDto::getDtoFromCompetitionPair).collect(Collectors.toSet())
        );
    }
}
