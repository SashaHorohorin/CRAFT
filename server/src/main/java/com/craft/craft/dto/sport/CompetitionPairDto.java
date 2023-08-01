package com.craft.craft.dto.sport;

import com.craft.craft.model.sport.CompetitionPair;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompetitionPairDto {
    private UUID id;
    private Set<SportsmenDto> player;
    private Set<SportsmenDto> requestToJoin;
    private Set<SportsmenDto> requestToInvite;
    private UUID competition;

    public static CompetitionPairDto getDtoFromCompetitionPair(CompetitionPair competitionPair){
        return new CompetitionPairDto(
                competitionPair.getId(),
                competitionPair.getPlayers().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                competitionPair.getRequestToJoin().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                competitionPair.getRequestToInvite().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                competitionPair.getCompetition().getId()
        );
    }
}
