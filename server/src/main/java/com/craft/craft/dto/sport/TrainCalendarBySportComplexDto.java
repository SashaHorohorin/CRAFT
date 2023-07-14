package com.craft.craft.dto.sport;

import com.craft.craft.dto.sport.TrainCalendarDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TrainCalendarBySportComplexDto {

    @JsonProperty("Алексеева")
    private TrainCalendarDto alexeeva;
    @JsonProperty("Динамит")
    private TrainCalendarDto dinamit;
    @JsonProperty("Импульс")
    private TrainCalendarDto impuls;
}
