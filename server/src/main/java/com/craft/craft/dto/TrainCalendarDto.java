package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainCalendarDto {
    private List<TrainInfoDto> monday;
    private List<TrainInfoDto> tuesday;
    private List<TrainInfoDto> wednesday;
    private List<TrainInfoDto> thursday;
    private List<TrainInfoDto> friday;
    private List<TrainInfoDto> saturday;
    private List<TrainInfoDto> sunday;
}
