package com.craft.craft.service.sport;

import com.craft.craft.dto.sport.competiton.CreateCompetitionDto;
import com.craft.craft.dto.sport.competiton.UpdateCompetitionDto;
import com.craft.craft.error.exeption.FullTrainException;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionPair;
import com.craft.craft.model.sport.CompetitionStatus;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.repository.sport.CompetitionPairRepo;
import com.craft.craft.repository.sport.CompetitionRepo;
import com.craft.craft.repository.user.BaseUserRepo;
import com.craft.craft.service.mail.LabService;
import com.craft.craft.service.mail.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompetitionService {
    private final CompetitionRepo competitionRepo;
    private final CompetitionPairRepo competitionPairRepo;
    private final BaseUserRepo baseUserRepo;
    private final MailSender mailSender;

    public List<Competition> findAll() {
        return competitionRepo.findAll();
    }

    public List<Competition> findAllActive() {
        return competitionRepo.findAllByStatus(CompetitionStatus.ACTIVE);
    }

    public Competition createCompetition(CreateCompetitionDto createCompetitionDto) {
        Competition competition = new Competition();
        competition.setSportComplex(createCompetitionDto.getSportComplex());
        competition.setStartCompetition(createCompetitionDto.getStartCompetition());
        competition.setMaxPair(createCompetitionDto.getMaxPair());
        competition.setType(createCompetitionDto.getType());
        competition.setStatus(CompetitionStatus.ACTIVE);
        competition.setEndCompetition(new Date(competition.getStartCompetition().getTime() + (1000 * 60 * 60 * 24)));//end на день больше чем start
        competition.setCategory(createCompetitionDto.getCategory());
        switch (competition.getCategory()){
            case AB: {competition.setRatingDown(700); break;}
            case BC: {competition.setRatingDown(600); break;}
            case CD: {competition.setRatingUp(600); break;}
            case DE: {competition.setRatingUp(450); break;}
            case EF: {competition.setRatingUp(350); break;}
        }
        return competitionRepo.save(competition);
    }

    public Boolean deleteCompetition(UUID id) {
        competitionRepo.deleteById(id);
        return true;
    }

    public Competition deletePair(UUID pairId) throws ModelNotFoundException {
        CompetitionPair pair = competitionPairRepo.findById(pairId).orElseThrow(
                () -> new ModelNotFoundException("Пара по данному id не найдена")
        );
        Competition competition = pair.getCompetition();
        competitionPairRepo.deleteById(pairId);
        return competition;
    }

    public Competition updateCompetition(UUID id, UpdateCompetitionDto dto) throws ModelNotFoundException {
        Competition competition = competitionRepo.findById(id).orElseThrow(
                () -> new ModelNotFoundException("Соревнование по такому id не найдено")
        );
        competition.setSportComplex(dto.getSportComplex());
        competition.setStartCompetition(dto.getStartCompetition());
        competition.setMaxPair(dto.getMaxPair());
        competition.setType(dto.getType());
        competition.setCategory(dto.getCategory());
        switch (competition.getCategory()) {
            case AB: {competition.setRatingDown(700); break;}
            case BC: {competition.setRatingDown(600); break;}
            case CD: {competition.setRatingUp(600); break;}
            case DE: {competition.setRatingUp(450); break;}
            case EF: {competition.setRatingUp(350); break;}
        }
        competition.setEndCompetition(new Date(competition.getStartCompetition().getTime() + (1000 * 60 * 60 * 24)));//end на день больше чем start

        return competitionRepo.save(competition);
    }

    public CompetitionPair createPair(UUID competitionId) throws ModelNotFoundException, FullTrainException {
        BaseUser player1 = getUserByUsername(getUsernameOfRequester());
        if (player1.getLabId() == null) throw new ModelNotFoundException("Необходимо указать id ЛАБ");
        Competition competition = competitionRepo.findById(competitionId)
                .orElseThrow(() -> new ModelNotFoundException("Соревнование с таким id не найдено"));

        if (competition.getMaxPair() == competition.getNowPair())
            throw new FullTrainException("Достигнуто максимальное количество записавшихся пар");
        if (competition.getCompetitionPairs().stream().anyMatch(pair -> pair.getPlayers().contains(player1)))
            throw new ModelNotFoundException("Вы уже записаны на соревнование");

        CompetitionPair pair = new CompetitionPair();
        player1.setRating(LabService.getUserRating(player1.getLabId()));
        pair.getPlayers().add(player1);
        competition.setNowPair(competition.getNowPair() + 1);
        pair.setCompetition(competition);
        competition.getCompetitionPairs().add(pair);
        return competitionPairRepo.save(pair);
    }

    public CompetitionPair addSecondUserToPairFromRequestJoin(UUID competitionPairId, String username) throws ModelNotFoundException, FullTrainException {

        BaseUser player2 = getUserByUsername(username);

        if (player2.getLabId() == null) throw new ModelNotFoundException("Необходимо указать id ЛАБ");
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId)
                .orElseThrow(() -> new ModelNotFoundException("Пара с таким id не найдена"));
        if (pair.getPlayers().size() >= 2)
            throw new ModelNotFoundException("Пара уже создана");
        Competition competition = pair.getCompetition();
        if (competition.getCompetitionPairs().stream().anyMatch(p -> p.getPlayers().contains(player2)))
            throw new ModelNotFoundException("Пользователь уже зарегистрирован на соревновании");
//        if (pair.getPlayers().iterator().next().getUsername().equals(authName))
//            pair.getRequestToJoin().remove(player2);
        player2.setRating(LabService.getUserRating(player2.getLabId()));
        String authName = getUsernameOfRequester();
        BaseUser player1 = pair.getPlayers().iterator().next();
        if(!authName.equals(player1.getUsername()))
            throw new ModelNotFoundException("Вы не можете принять пользователя не в свою пару");
        if(competition.getRatingDown()!= null && competition.getRatingDown() > (player1.getRating() + player2.getRating())){
            pair.getRequestToInvite().clear();
            pair.getRequestToJoin().clear();
            throw new ModelNotFoundException("Суммарный рейтинг пары меньше допустимого на соревновании");
        }

        if(competition.getRatingUp()!= null && competition.getRatingUp() < (player1.getRating() + player2.getRating())){
            pair.getRequestToInvite().clear();
            pair.getRequestToJoin().clear();
            throw new ModelNotFoundException("Суммарный рейтинг пары больше заявленного");
        }
        pair.getPlayers().add(player2);
        if (pair.getPlayers().size() == 2) {
            pair.getRequestToInvite().clear();
            pair.getRequestToJoin().clear();
        }
        return competitionPairRepo.save(pair);
    }

    public CompetitionPair addSecondUserToPairFromRequestInvite(UUID competitionPairId, String username) throws ModelNotFoundException {
        if (!getUsernameOfRequester().equals(username))
            throw new ModelNotFoundException("Вы не можете принять запрос не от своего имени");
        BaseUser player2 = getUserByUsername(getUsernameOfRequester());
        if (player2.getLabId() == null) throw new ModelNotFoundException("Необходимо указать id ЛАБ");
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId)
                .orElseThrow(() -> new ModelNotFoundException("Пара с таким id не найдена"));
        if (pair.getPlayers().size() >= 2)
            throw new ModelNotFoundException("Пара уже создана");
        Competition competition = pair.getCompetition();
        if (competition.getCompetitionPairs().stream().anyMatch(p -> p.getPlayers().contains(player2)))
            throw new ModelNotFoundException("Вы уже зарегистрирован на соревновании");
        player2.setRating(LabService.getUserRating(player2.getLabId()));
        BaseUser player1 = pair.getPlayers().iterator().next();
        System.out.println(competition.getRatingDown());
        System.out.println(competition.getRatingUp());
        System.out.println(player1.getRating());
        System.out.println( player2.getRating());
        if(competition.getRatingDown()!= null && competition.getRatingDown() > (player1.getRating() + player2.getRating())){
            pair.getRequestToInvite().clear();
            pair.getRequestToJoin().clear();
            throw new ModelNotFoundException("Суммарный рейтинг пары меньше допустимого на соревновании");
        }
        if(competition.getRatingUp()!= null && competition.getRatingUp() < (player1.getRating() + player2.getRating())){
            pair.getRequestToInvite().clear();
            pair.getRequestToJoin().clear();
            throw new ModelNotFoundException("Суммарный рейтинг пары больше заявленного");
        }

        pair.getRequestToInvite().forEach(user -> {
            if (user.getUsername().equals(username))
                pair.getPlayers().add(player2);
        });
        if (pair.getPlayers().size() == 2) {
            pair.getRequestToInvite().clear();
            pair.getRequestToJoin().clear();
        }
        return competitionPairRepo.save(pair);
    }

    public CompetitionPair requestToJoinIntoPair(UUID competitionPairId) throws ModelNotFoundException {
        BaseUser player = getUserByUsername(getUsernameOfRequester());

        if (player.getLabId() == null) throw new ModelNotFoundException("Необходимо указать id ЛАБ");
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId)
                .orElseThrow(() -> new ModelNotFoundException("по данному id пара не найдена"));
        if (pair.getCompetition().getCompetitionPairs().stream().anyMatch(p -> p.getPlayers().contains(player)))
            throw new ModelNotFoundException("Вы уже записаны на соревнование");

        player.setRating(LabService.getUserRating(player.getLabId()));
        pair.getPlayers().forEach(user -> {
            try {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(pair.getCompetition().getStartCompetition());
                String massage = String.format(
                        "<html><body><div>" + "Привет, %s.\n" +
                                "Пользователь %s хочет присоединиться к вам в пару на соревнование %s, " +
                                "которое пройдет %s.</div>\n" +
                                "Вы можете принять заявку в своем личном кабинете" +
                                "</body></html>",
                        user.getFirstName() + " " + user.getLastName(),
                        player.getFirstName() + " " + player.getLastName(),
                        pair.getCompetition().getType(),
                        calendar.get(Calendar.DAY_OF_MONTH) + "." +
                                calendar.get(Calendar.MONTH) + "." +
                                calendar.get(Calendar.YEAR)
                );
                mailSender.sendMime(user.getEmail(), "CRAFT. Заявка на добавление в пару", massage);
            } catch (MessagingException e) {
                //письмо не отправлено
            }
        });
        pair.getRequestToJoin().add(player);
        return competitionPairRepo.save(pair);
    }

    public CompetitionPair rejectRequestJoin(UUID competitionPairId, String username) throws ModelNotFoundException {
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId).orElseThrow(() -> new ModelNotFoundException("По данному id пара не найдена"));
        BaseUser user = baseUserRepo.findByUsername(username).orElseThrow(() -> new ModelNotFoundException("По данному id пользователь не найден"));
        System.out.println(username);
        System.out.println(getUsernameOfRequester());
        if (
                !getUsernameOfRequester().equals(username) &&
                !getUsernameOfRequester().equals(pair.getPlayers().iterator().next().getUsername())
        ) throw new ModelNotFoundException("Вы не можете изменять данные другого пользователя");
        pair.getRequestToJoin().remove(user);
        return competitionPairRepo.save(pair);
    }

    public CompetitionPair rejectRequestInvite(UUID competitionPairId, String username) throws ModelNotFoundException {
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId).orElseThrow(() -> new ModelNotFoundException("По данному id пара не найдена"));
        BaseUser user = baseUserRepo.findByUsername(username).orElseThrow(() -> new ModelNotFoundException("По данному id пользователь не найден"));
        System.out.println(getUsernameOfRequester());
        System.out.println(pair.getPlayers().iterator().next().getUsername());
        if (
                !getUsernameOfRequester().equals(username) &&
                !getUsernameOfRequester().equals(pair.getPlayers().iterator().next().getUsername())
        ) throw new ModelNotFoundException("Вы не можете изменять данные другого пользователя");
        pair.getRequestToInvite().remove(user);
        return competitionPairRepo.save(pair);
    }

    public CompetitionPair requestToInviteIntoPair(UUID competitionPairId, String username) throws ModelNotFoundException, MessagingException {
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId)
                .orElseThrow(() -> new ModelNotFoundException("по данному id пара не найдена"));
        BaseUser reqTo = baseUserRepo.findByUsername(username)
                .orElseThrow(() -> new ModelNotFoundException("по данному username пользователь не найден"));
        Competition competition = pair.getCompetition();
        if (competition.getCompetitionPairs().stream().anyMatch(p -> p.getPlayers().contains(reqTo)))
            throw new ModelNotFoundException("Пользователь уже зарегистрирован на соревновании");
        if (reqTo.getLabId() != null) reqTo.setRating(LabService.getUserRating(reqTo.getLabId()));
        BaseUser creator = pair.getPlayers().iterator().next();
        if (creator.getUsername().equals(getUsernameOfRequester())) {
            try {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(pair.getCompetition().getStartCompetition());
                String massage = String.format(
                        "<html><body><div>" + "Привет, %s.\n" +
                                "Пользователь %s хочет пригласить вас на соревнование %s, " +
                                "которое пройдет %s.</div>\n" +
                                "Вы можете принять заявку в своем личном кабинете" +
                                "</body></html>",
                        reqTo.getFirstName() + " " + reqTo.getLastName(),
                        creator.getFirstName() + " " + creator.getLastName(),
                        pair.getCompetition().getType(),
                        calendar.get(Calendar.DAY_OF_MONTH) + "." +
                                calendar.get(Calendar.MONTH) + "." +
                                calendar.get(Calendar.YEAR)
                );
                mailSender.sendMime(reqTo.getEmail(), "CRAFT. Заявка на добавление в пару", massage);
            } catch (MessagingException e) {
                //письмо не отправлено
            }
            pair.getRequestToInvite().add(reqTo);
        }
        return competitionPairRepo.save(pair);
    }

    public Competition findById(UUID id) throws ModelNotFoundException {
        return competitionRepo.findById(id).orElseThrow(() -> new ModelNotFoundException("Нет соревнования с таким id"));
    }

    private BaseUser getUserByUsername(String username) throws ModelNotFoundException {
        return baseUserRepo.findByUsername(username)
                .orElseThrow(() -> new ModelNotFoundException("Пользователь с username=" + username + " не найден"));
    }

    private String getUsernameOfRequester() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @Async
    @Scheduled(fixedDelay = 1000 * 60 * 60)//каждый час
    public void updateCompetitionStatus() {
        List<Competition> competitions = findAllActive();
        Date now = new Date();
        competitions.forEach(competition -> {
            if (competition.getEndCompetition().after(now))
                competition.setStatus(CompetitionStatus.NOT_ACTIVE);
        });
    }

}
