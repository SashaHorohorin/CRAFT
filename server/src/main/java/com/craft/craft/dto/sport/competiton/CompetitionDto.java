package com.craft.craft.dto.sport.competiton;

import com.craft.craft.model.sport.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompetitionDto implements ItemInCalendar{

    private UUID id;
    private SportComplex sportComplex;
    private CompetitionType type;
    private Date startCompetition;
    private Date endCompetition;
    private int maxParticipant;
    private int nowParticipant;
    private Set<CompetitionPairDto> competitionPairs = new HashSet<>();
    private CompetitionStatus status;
    private String info;
    private Integer ratingUp;
    private Integer ratingDown;
    private CategoryOfCompetition category;
    @NonNull
    private ItemInCalendarType itemType;

    public static CompetitionDto getDtoFromCompetition(Competition competition){
        return new CompetitionDto(
                competition.getId(),
                competition.getSportComplex(),
                competition.getType(),
                competition.getStartCompetition(),
                competition.getEndCompetition(),
                competition.getMaxPair(),
                competition.getNowPair(),
                competition.getCompetitionPairs().stream().map(CompetitionPairDto::getDtoFromCompetitionPair).collect(Collectors.toSet()),
                competition.getStatus(),
                competition.getInfo(),
                competition.getRatingUp(),
                competition.getRatingDown(),
                competition.getCategory(),
                ItemInCalendarType.COMPETITION
        );
    }

    @Override
    public ItemInCalendarType getItemType() {
        return ItemInCalendarType.COMPETITION;
    }

    @Override
    public Date getStartItem() {
        return startCompetition;
    }

    @Override
    public SportComplex getSportComplexOfItem() {
        return sportComplex;
    }
}
