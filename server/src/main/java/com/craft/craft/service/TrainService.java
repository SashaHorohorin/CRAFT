package com.craft.craft.service;

import com.craft.craft.dto.TrainCalendarDto;
import com.craft.craft.dto.TrainInfoDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.sport.Train;
import com.craft.craft.repository.sport.TrainRepo;
import com.craft.craft.repository.user.AdminRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainService {

    private final TrainRepo trainRepo;
    private final AdminRepo adminRepo;


    public Train createTrain(Train train) throws ModelNotFoundException {
        String authorName = SecurityContextHolder.getContext().getAuthentication().getName();
        adminRepo.findByUsername(authorName).orElseThrow(() -> new ModelNotFoundException("Пользователя не существует или пользователь не является администратором"));
        return trainRepo.save(train);
    }

    public TrainCalendarDto getTrainCalendarOnThisWeek() throws ModelNotFoundException {

        LocalDate now = LocalDate.now();
        LocalDate lastWeekStart = now.minusWeeks(0).with(DayOfWeek.MONDAY);
        LocalDate lastWeekEnd = lastWeekStart.plusDays(7);
        Date start = Date.from(lastWeekStart.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end = Date.from(lastWeekEnd.atStartOfDay(ZoneId.systemDefault()).toInstant());

        List<Train> trains = trainRepo.findAllByStartTrainBetween(start, end)
                .orElseThrow(() -> new ModelNotFoundException("В указанных датах нет тренировок"));

        List<TrainInfoDto> monday = getTrainsAtDayOfWeek(Calendar.MONDAY, trains).stream().map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> tuesday = getTrainsAtDayOfWeek(Calendar.TUESDAY, trains).stream().map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> wednesday = getTrainsAtDayOfWeek(Calendar.WEDNESDAY, trains).stream().map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> thursday = getTrainsAtDayOfWeek(Calendar.THURSDAY, trains).stream().map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> friday = getTrainsAtDayOfWeek(Calendar.FRIDAY, trains).stream().map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> saturday = getTrainsAtDayOfWeek(Calendar.SATURDAY, trains).stream().map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> sunday = getTrainsAtDayOfWeek(Calendar.SUNDAY, trains).stream().map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());

        return new TrainCalendarDto(
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
        );
    }


    private List<Train> getTrainsAtDayOfWeek(int dayOfWeek, List<Train> allTrains){
        return allTrains.stream().filter(train -> {
                    Calendar c = Calendar.getInstance();
                    c.setTime(train.getStartTrain());
                    int day = c.get(Calendar.DAY_OF_WEEK);
                    return day == dayOfWeek;
                }
        ).collect(Collectors.toList());
    }
}
