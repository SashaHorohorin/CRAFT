package com.craft.craft.dto.sport.train;

import com.craft.craft.dto.sport.train.TrainCalendarDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Deprecated
public class TrainCalendarBySportComplexDto {

    @JsonProperty("Динамит")
    private TrainCalendarDto dinamit;
    @JsonProperty("Импульс")
    private TrainCalendarDto impuls;
    @JsonProperty("Алексеева")
    private TrainCalendarDto alexeeva;

}
