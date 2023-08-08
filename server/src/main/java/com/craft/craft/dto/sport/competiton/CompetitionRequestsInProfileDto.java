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
@NoArgsConstructor
@AllArgsConstructor
public class CompetitionRequestsInProfileDto {

    private UUID id;
    private Set<SportsmenDto> requestToJoin = new HashSet<>();
    private Set<SportsmenDto> requestToInvite = new HashSet<>();
    private UUID competition;
    public static CompetitionRequestsInProfileDto getDtoFromCompetitionPair(CompetitionPair pair){
        return new CompetitionRequestsInProfileDto(
                pair.getId(),
                pair.getRequestToJoin().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                pair.getRequestToInvite().stream().map(SportsmenDto::getDtoFromBaseUser).collect(Collectors.toSet()),
                pair.getCompetition().getId()

        );
    }
}
