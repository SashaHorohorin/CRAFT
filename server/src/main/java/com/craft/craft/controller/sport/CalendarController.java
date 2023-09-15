package com.craft.craft.controller.sport;

import com.craft.craft.dto.sport.CalendarOnWeek;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.sport.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/get")
    public CalendarOnWeek getCalendar(
            @RequestParam(value = "page", defaultValue = "0") Integer page
    ) throws ModelNotFoundException {
        Date startDay = Date.from(new Date().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate().atStartOfDay(ZoneId.systemDefault()).toInstant()
        );
        Date date = Date.from(startDay.toInstant().plus(7 * page, ChronoUnit.DAYS));
       return calendarService.getTrainCalendarOnWeek(date);
    }
}
