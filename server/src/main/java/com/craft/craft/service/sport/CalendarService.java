package com.craft.craft.service.sport;

import com.craft.craft.dto.sport.CalendarForSportComplexOnWeek;
import com.craft.craft.dto.sport.CalendarOnWeek;
import com.craft.craft.dto.sport.competiton.CompetitionDto;
import com.craft.craft.dto.sport.train.TrainInfoDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.ItemInCalendar;
import com.craft.craft.model.sport.SportComplex;
import com.craft.craft.model.sport.Train;
import com.craft.craft.repository.sport.CompetitionRepo;
import com.craft.craft.repository.sport.TrainRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final TrainRepo trainRepo;
    private final CompetitionRepo competitionRepo;

    public CalendarOnWeek getTrainCalendarOnWeek(Date dayOfThisWeek) throws ModelNotFoundException {

        LocalDate now = LocalDate.ofInstant(dayOfThisWeek.toInstant(), ZoneId.systemDefault());
        LocalDate lastWeekStart = now.minusWeeks(0).with(DayOfWeek.MONDAY);
        LocalDate lastWeekEnd = lastWeekStart.plusDays(7);
        Date start = Date.from(lastWeekStart.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end = Date.from(lastWeekEnd.atStartOfDay(ZoneId.systemDefault()).toInstant());
        System.out.println(start);
        System.out.println(end);
        List<ItemInCalendar> items = new ArrayList<>();

        List<Train> trains = trainRepo.findAllByStartTrainBetween(start, end)
                .orElseThrow(() -> new ModelNotFoundException("В указанных датах нет тренировок"));
        List<Competition> competitions = competitionRepo.findAllByStartCompetitionBetween(start, end)
                .orElseThrow(() -> new ModelNotFoundException("В указанных датах нет соревнований"));
        items.addAll(trains);
        items.addAll(competitions);
        CalendarForSportComplexOnWeek alexeeva = getCalendarAtWeekForSportComplex(SportComplex.ALEKSEEVA, items);
        CalendarForSportComplexOnWeek dinamit = getCalendarAtWeekForSportComplex(SportComplex.DINAMIT, items);
        CalendarForSportComplexOnWeek impuls = getCalendarAtWeekForSportComplex(SportComplex.IMPULS, items);
        return new CalendarOnWeek(dinamit , impuls, alexeeva);
    }

    public CalendarForSportComplexOnWeek getCalendarAtWeekForSportComplex(SportComplex sportComplex, List<ItemInCalendar> items) {
        List<ItemInCalendar> monday = getCalendarItemsAtDayOfWeek(Calendar.MONDAY, sportComplex, items);
        List<ItemInCalendar> tuesday = getCalendarItemsAtDayOfWeek(Calendar.TUESDAY, sportComplex, items);
        List<ItemInCalendar> wednesday = getCalendarItemsAtDayOfWeek(Calendar.WEDNESDAY, sportComplex, items);
        List<ItemInCalendar> thursday = getCalendarItemsAtDayOfWeek(Calendar.THURSDAY, sportComplex, items);
        List<ItemInCalendar> friday = getCalendarItemsAtDayOfWeek(Calendar.FRIDAY, sportComplex, items);
        List<ItemInCalendar> saturday = getCalendarItemsAtDayOfWeek(Calendar.SATURDAY, sportComplex, items);
        List<ItemInCalendar> sunday = getCalendarItemsAtDayOfWeek(Calendar.SUNDAY, sportComplex, items);
        return new CalendarForSportComplexOnWeek(
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
        );
    }

    private List<ItemInCalendar> getCalendarItemsAtDayOfWeek(int dayOfWeek, SportComplex sportComplex, List<ItemInCalendar> items) {
        return items.stream().filter(item -> {
                    Calendar c = Calendar.getInstance();
                    c.setTime(item.getStartItem());
                    int day = c.get(Calendar.DAY_OF_WEEK);
                    return day == dayOfWeek;
                }
        ).filter(item -> item.getSportComplexOfItem().equals(sportComplex))
                .map(item -> {
                    if (item instanceof Competition)
                        return CompetitionDto.getDtoFromCompetition((Competition) item);
                    else if (item instanceof Train)
                        return TrainInfoDto.getDtoFromTrain((Train) item);
                    else return null;
                }).collect(Collectors.toList());
    }


}
