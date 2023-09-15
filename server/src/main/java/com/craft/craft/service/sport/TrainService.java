package com.craft.craft.service.sport;

import com.craft.craft.dto.sport.train.TrainCalendarBySportComplexDto;
import com.craft.craft.dto.sport.train.TrainCalendarDto;
import com.craft.craft.dto.sport.train.TrainInfoDto;
import com.craft.craft.dto.sport.train.TrainUpdateDto;
import com.craft.craft.error.exeption.FullTrainException;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.sport.SportComplex;
import com.craft.craft.model.sport.Train;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.repository.sport.TrainRepo;
import com.craft.craft.repository.sport.TrainerRepo;
import com.craft.craft.repository.user.AdminRepo;
import com.craft.craft.repository.user.BaseUserRepo;
import com.craft.craft.service.mail.MailingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainService {

    private final TrainRepo trainRepo;
    private final TrainerRepo trainerRepo;
    private final BaseUserRepo baseUserRepo;
    private final AdminRepo adminRepo;
    private final MailingService mailingService;

    public Train createTrain(TrainUpdateDto trainDto) throws ModelNotFoundException {
        String authorName = SecurityContextHolder.getContext().getAuthentication().getName();
        adminRepo.findByUsername(authorName).orElseThrow(() -> new ModelNotFoundException("Пользователя не существует или пользователь не является администратором"));
        Train train = new Train(
                trainDto.getType(),
                trainDto.getStartTrain(),
                trainDto.getEndTrain(),
                trainDto.getMaxParticipant(),
                trainDto.getSportComplex()
        );
        train.getTrainers().addAll(trainDto.getTrainersId().stream()
                .map(trainerId -> trainerRepo.findById(trainerId).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toSet()));

        List<BaseUser> users = baseUserRepo.findAll();

        return trainRepo.save(train);
    }

    public void deleteTrain(UUID id) {
        trainRepo.deleteById(id);
    }

    public Train getById(UUID id) throws ModelNotFoundException {
        return trainRepo.findById(id).orElseThrow(() -> new ModelNotFoundException("Тренировка с таким id не найдена"));
    }

    public Train addUserToTrain(UUID trainId, String username) throws ModelNotFoundException, FullTrainException {
        BaseUser user = baseUserRepo.findByUsername(username).orElseThrow(() -> new ModelNotFoundException("Пользователь с таким username не найден"));
//        BaseUser user = baseUserRepo.findByUsername(username).orElse(null);
//        System.out.println(user);
        Train train = trainRepo.findById(trainId).orElseThrow(() -> new ModelNotFoundException("Тренировка с таким id не найдена"));
        if (train.getMaxParticipant() == train.getNowParticipant())
            throw new FullTrainException("Достигнуто максимальное количество записавшихся");
        train.getSportsmen().add(user);
        if(!user.isHaveFirstTrain()){
            mailingService.sendToAdminThatUserHaveFirstTrain(user, train);
            user.setHaveFirstTrain(true);
        }
        train.setNowParticipant(train.getNowParticipant() + 1);
        if(user.getPrice() != null){
            if(user.getPrice().getRemainingTrains() == 0)
                user.setPrice(null);
            else
                user.getPrice().setRemainingTrains(user.getPrice().getRemainingTrains() - 1);
        }
        return trainRepo.save(train);
    }

    public Train removeUserFromTrain(UUID trainId, String username) throws ModelNotFoundException {
        BaseUser user = baseUserRepo.findByUsername(username).orElseThrow(() -> new ModelNotFoundException("Пользователь с таким username не найден"));
        Train train = trainRepo.findById(trainId).orElseThrow(() -> new ModelNotFoundException("Тренировка с таким id не найдена"));
        if(train.getSportsmen().remove(user)) {
            train.setNowParticipant(train.getNowParticipant() - 1);
            if(user.getPrice() != null) {
                if(user.getPrice().getRemainingTrains() < user.getPrice().getMaxTrains())
                    user.getPrice().setRemainingTrains(user.getPrice().getRemainingTrains() + 1);
            }
        }
        return trainRepo.save(train);
    }

    public Train changeTrain(UUID id, TrainUpdateDto updateDto) throws ModelNotFoundException {
        Train train = trainRepo.findById(id).orElseThrow(() -> new ModelNotFoundException("Тренировка с таким id не найдена"));

        train.setMaxParticipant(updateDto.getMaxParticipant());
        train.setTrainers(updateDto.getTrainersId().stream()
                .map(trainerId -> trainerRepo.findById(trainerId).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toSet())
        );
        train.setStartTrain(updateDto.getStartTrain());
        train.setEndTrain(updateDto.getEndTrain());
        train.setType(updateDto.getType());
        train.setSportComplex(updateDto.getSportComplex());
        return trainRepo.save(train);
    }

    @Deprecated
    public TrainCalendarBySportComplexDto getTrainCalendarOnThisWeek() throws ModelNotFoundException {

        LocalDate now = LocalDate.now();
        LocalDate lastWeekStart = now.minusWeeks(0).with(DayOfWeek.MONDAY);
        LocalDate lastWeekEnd = lastWeekStart.plusDays(7);
//        LocalDate lastWeekStart = now;
//        LocalDate lastWeekEnd = now.plusDays(7);
        Date start = Date.from(lastWeekStart.atStartOfDay(ZoneId.of("Europe/Moscow")).toInstant());
        Date end = Date.from(lastWeekEnd.atStartOfDay(ZoneId.of("Europe/Moscow")).toInstant());

        List<Train> trains = trainRepo.findAllByStartTrainBetween(start, end)
                .orElseThrow(() -> new ModelNotFoundException("В указанных датах нет тренировок"));

        TrainCalendarDto alexeeva = getTrainCalendarAtSportComplex(SportComplex.ALEKSEEVA, trains);
        TrainCalendarDto dinamit = getTrainCalendarAtSportComplex(SportComplex.DINAMIT, trains);
        TrainCalendarDto impuls = getTrainCalendarAtSportComplex(SportComplex.IMPULS, trains);
        return new TrainCalendarBySportComplexDto(dinamit, impuls, alexeeva);
    }

    public List<Train> findAll(){
        return trainRepo.findAll();
    }

    @Deprecated
    private List<Train> getTrainsAtDayOfWeek(int dayOfWeek, List<Train> allTrains) {
        return allTrains.stream().filter(train -> {
                    Calendar c = Calendar.getInstance();
                    c.setTime(train.getStartTrain());
                    int day = c.get(Calendar.DAY_OF_WEEK);
                    return day == dayOfWeek;
                }
        ).collect(Collectors.toList());
    }

    @Deprecated
    private TrainCalendarDto getTrainCalendarAtSportComplex(SportComplex complex, List<Train> allTrains) {
        List<TrainInfoDto> monday = getTrainsAtDayOfWeek(Calendar.MONDAY, allTrains).stream()
                .filter(train -> train.getSportComplex().equals(complex))
                .map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> tuesday = getTrainsAtDayOfWeek(Calendar.TUESDAY, allTrains).stream()
                .filter(train -> train.getSportComplex().equals(complex))
                .map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> wednesday = getTrainsAtDayOfWeek(Calendar.WEDNESDAY, allTrains).stream()
                .filter(train -> train.getSportComplex().equals(complex))
                .map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> thursday = getTrainsAtDayOfWeek(Calendar.THURSDAY, allTrains).stream()
                .filter(train -> train.getSportComplex().equals(complex))
                .map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> friday = getTrainsAtDayOfWeek(Calendar.FRIDAY, allTrains).stream()
                .filter(train -> train.getSportComplex().equals(complex))
                .map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> saturday = getTrainsAtDayOfWeek(Calendar.SATURDAY, allTrains).stream()
                .filter(train -> train.getSportComplex().equals(complex))
                .map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());
        List<TrainInfoDto> sunday = getTrainsAtDayOfWeek(Calendar.SUNDAY, allTrains).stream()
                .filter(train -> train.getSportComplex().equals(complex))
                .map(TrainInfoDto::getDtoFromTrain).collect(Collectors.toList());

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
}
