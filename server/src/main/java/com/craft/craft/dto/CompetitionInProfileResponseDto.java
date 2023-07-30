package com.craft.craft.dto;

import com.craft.craft.model.sport.Competition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompetitionInProfileResponseDto {

    private String title;

    public static CompetitionInProfileResponseDto getDtoFromCompetition(Competition competition){
        return new CompetitionInProfileResponseDto(
            competition.getTitle()
        );
    }
}
