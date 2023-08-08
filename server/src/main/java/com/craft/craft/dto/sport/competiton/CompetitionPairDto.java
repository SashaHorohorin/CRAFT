package com.craft.craft.dto.sport.competiton;

import com.craft.craft.dto.sport.SportsmenDto;
import com.craft.craft.model.sport.CompetitionPair;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompetitionPairDto {
    private UUID id;
    private Set<SportsmenDto> player = new HashSet<>();
    private Set<SportsmenDto> requestToJoin = new HashSet<>();
    private Set<SportsmenDto> requestToInvite = new HashSet<>();
    private UUID competition;
    private Integer ratingOfPair;

    public static CompetitionPairDto getDtoFromCompetitionPair(CompetitionPair competitionPair){
        return new CompetitionPairDto(
                competitionPair.getId(),
                competitionPair.getPlayers().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                competitionPair.getRequestToJoin().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                competitionPair.getRequestToInvite().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                competitionPair.getCompetition().getId(),
                competitionPair.getPlayers().stream().mapToInt(player->{
                    if(player == null) return 0;
                    return player.getRating();
                }).sum()
        );
    }
}
