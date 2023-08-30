package com.craft.craft.dto.sport;

import com.craft.craft.dto.sport.train.TrainInfoDto;
import com.craft.craft.model.sport.ItemInCalendar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarForSportComplexOnWeek {
    private List<ItemInCalendar> monday;
    private List<ItemInCalendar> tuesday;
    private List<ItemInCalendar> wednesday;
    private List<ItemInCalendar> thursday;
    private List<ItemInCalendar> friday;
    private List<ItemInCalendar> saturday;
    private List<ItemInCalendar> sunday;
}
