package com.craft.craft.dto.sport;

import com.craft.craft.model.sport.SportComplex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCompetitionDto {
    @NonNull
    private SportComplex sportComplex;
    @NonNull
    private Date startCompetition;
    @NonNull
    private int maxPair;
}
