package com.craft.craft.dto;

import com.craft.craft.dto.sport.TrainCalendarDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TrainCalendarBySportComplexDto {

    private TrainCalendarDto alexeeva;
    private TrainCalendarDto dinamit;
    private TrainCalendarDto impuls;
}
