package com.craft.craft.dto.sport;

import com.craft.craft.dto.sport.train.TrainCalendarDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CalendarOnWeek {

    @JsonProperty("Динамит")
    private CalendarForSportComplexOnWeek dinamit;
    @JsonProperty("Импульс")
    private CalendarForSportComplexOnWeek impuls;
    @JsonProperty("Алексеева")
    private CalendarForSportComplexOnWeek alexeeva;
}
