package com.craft.craft.service.sport;

import com.craft.craft.error.exeption.FullTrainException;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionPair;
import com.craft.craft.model.user.Admin;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.repository.sport.CompetitionPairRepo;
import com.craft.craft.repository.sport.CompetitionRepo;
import com.craft.craft.repository.user.BaseUserRepo;
import com.craft.craft.service.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Calendar;
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

//    public Competition addPairToCompetition(UUID competitionId, String username1, String username2) throws ModelNotFoundException, FullTrainException {
//        BaseUser player1 = getUserByUsername(username1);
//        BaseUser player2 =getUserByUsername(username2);
//        Competition competition = competitionRepo.findById(competitionId)
//                .orElseThrow(() -> new ModelNotFoundException("Соревнование с таким id не найдена"));
//        if (competition.getMaxParticipant() == competition.getNowParticipant())
//            throw new FullTrainException("Достигнуто максимольное количество записавшихся пар");
//        competition.getSportsmen().add(player1);
//        competition.getSportsmen().add(player2);
//        CompetitionPair pair = CompetitionPair.builder().player1(player1).player2(player2).build();
//        competition.getCompetitionPairs().add(pair);
//        competition.setNowParticipant(competition.getNowParticipant() + 1);
//        return competitionRepo.save(competition);
//    }


    public CompetitionPair createPair(UUID competitionId) throws ModelNotFoundException, FullTrainException {
        String authName = SecurityContextHolder.getContext().getAuthentication().getName();
        BaseUser player1 = getUserByUsername(authName);
        Competition competition = competitionRepo.findById(competitionId)
                .orElseThrow(() -> new ModelNotFoundException("Соревнование с таким id не найдена"));
        if (competition.getMaxPair() == competition.getNowPair())
            throw new FullTrainException("Достигнуто максимольное количество записавшихся пар");
        CompetitionPair pair = new CompetitionPair();
        pair.getPlayers().add(player1);
        competition.setNowPair(competition.getNowPair() + 1);
        pair.setCompetition(competition);
        competition.getCompetitionPairs().add(pair);
        return competitionPairRepo.save(pair);
    }

    public CompetitionPair addSecondUserToPairFromRequestJoin(UUID competitionPairId, String username) throws ModelNotFoundException, FullTrainException {
        String authName = SecurityContextHolder.getContext().getAuthentication().getName();
        //BaseUser player1 = getUserByUsername(authName);
        BaseUser player2 = getUserByUsername(username);
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId)
                .orElseThrow(() -> new ModelNotFoundException("Пара с таким id не найдена"));
        if(pair.getPlayers().size() >= 2)
            throw new ModelNotFoundException("Пара уже создана");
        if(pair.getPlayers().iterator().next().getUsername().equals(authName))
            pair.getRequestToJoin().remove(player2);
        pair.getPlayers().add(player2);
        if(pair.getPlayers().size() == 2){
            pair.setRequestToInvite(null);
            pair.setRequestToJoin(null);
        }
        return competitionPairRepo.save(pair);
    }
    public CompetitionPair addSecondUserToPairFromRequestInvite(UUID competitionPairId, String username) throws ModelNotFoundException, FullTrainException {
        String authName = SecurityContextHolder.getContext().getAuthentication().getName();
        BaseUser player = getUserByUsername(username);
        if(!authName.equals(username)) throw new ModelNotFoundException("Вы не можете принять запрос не от своего имени");
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId)
                .orElseThrow(() -> new ModelNotFoundException("Пара с таким id не найдена"));
        if(pair.getPlayers().size() >= 2)
            throw new ModelNotFoundException("Пара уже создана");
        pair.getRequestToInvite().forEach(user -> {
            if(user.getUsername().equals(username))
                pair.getPlayers().add(player);
        });
        if(pair.getPlayers().size() == 2){
            pair.setRequestToInvite(null);
            pair.setRequestToJoin(null);
        }
        return competitionPairRepo.save(pair);
    }

    public CompetitionPair requestToJoin(UUID competitionPairId) throws ModelNotFoundException, MessagingException {
        String authName = SecurityContextHolder.getContext().getAuthentication().getName();
        BaseUser player = getUserByUsername(authName);
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId)
                .orElseThrow(()->new ModelNotFoundException("по данному id пара не найдена"));
        pair.getPlayers().forEach(user-> {
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
    public CompetitionPair requestToInvite(UUID competitionPairId, String username) throws ModelNotFoundException, MessagingException {
        String authName = SecurityContextHolder.getContext().getAuthentication().getName();
        CompetitionPair pair = competitionPairRepo.findById(competitionPairId)
              .orElseThrow(()->new ModelNotFoundException("по данному id пара не найдена"));
        BaseUser reqTo = baseUserRepo.findByUsername(username)
                .orElseThrow(()->new ModelNotFoundException("по данному username пользователь не найден"));
        BaseUser creator = pair.getPlayers().iterator().next();
        if(creator.getUsername().equals(authName)) {
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


    private BaseUser getUserByUsername(String username) throws ModelNotFoundException {
        return baseUserRepo.findByUsername(username)
                .orElseThrow(() -> new ModelNotFoundException("Пользователь с username=" + username + " не найден"));
    }
}
