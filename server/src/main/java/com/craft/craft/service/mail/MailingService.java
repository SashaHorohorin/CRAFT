package com.craft.craft.service.mail;


import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionType;
import com.craft.craft.model.sport.Train;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.repository.user.BaseUserRepo;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MailingService {

    @Autowired
    private MailSender mailSender;
    @Autowired
    private BaseUserRepo userRepo;

    public void mailingAboutCreatedCompetitions(List<BaseUser> users, List<Competition> competitions) {
        Calendar calendar = Calendar.getInstance();
        String formattedCompetitionDataList = competitions.stream().map(competition -> {
            calendar.setTime(competition.getStartCompetition());
            String type = "type";
            try {
                Annotation[] annotations = CompetitionType.class.getField(competition.getType().name()).getAnnotations();
                JsonProperty properties = (JsonProperty) annotations[0];
                type = properties.value();
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }
            calendar.add(Calendar.HOUR, 3);
            return "" + type + " " + competition.getCategory() +
                    " - дата проведения: " + normalizeDateItemForMessage(calendar.get(Calendar.HOUR_OF_DAY)) + ":" +
                    normalizeDateItemForMessage(calendar.get(Calendar.MINUTE)) + " " +
                    normalizeDateItemForMessage(calendar.get(Calendar.DAY_OF_MONTH)) + "." +
                    normalizeDateItemForMessage(calendar.get(Calendar.MONTH) + 1) + "." +
                    calendar.get(Calendar.YEAR) + "\n";
        }).collect(Collectors.joining());

        users.forEach(user -> {
            if (!user.isAgreementMailing()) return;
            String massage = String.format(
                    "Привет, %s \n" +
                            "Появились новые соревнования:\n\n%s \nЗаписывайтесь по ссылке https://craft-bc.ru/competitions",
                    user.getFirstName() + " " + user.getLastName(),
                    formattedCompetitionDataList
            );
            mailSender.send(user.getEmail(), "CRAFT. Появились новые соревнования.", massage);
        });
    }

    public void mailingAboutCreatedTrains(List<BaseUser> users) {
        users.forEach(user -> {
            if (!user.isAgreementMailing()) return;
            String massage = String.format(
                    "Привет, %s \n" +
                            "Появились новые тренировки на эту неделю.\n" +
                            "Записывайтесь по ссылке https://craft-bc.ru/training",
                    user.getFirstName() + " " + user.getLastName()
            );
            mailSender.send(user.getEmail(), "CRAFT. Появились новые тренировки.", massage);
        });
    }

    public void createUserForFirstTrain(BaseUser user, String password) {
        String massage = String.format(
                "Привет, %s \n" +
                        "Вы заполнили форму для записи на пробную тренировку.\n" +
                        "Ваши данные для входа в личный кабинет:\n" +
                        "login: %s\n" +
                        "password: %s\n" +
                        "Записывайтесь по ссылке https://craft-bc.ru/training",
                user.getFirstName() + " " + user.getLastName(),
                user.getEmail(), password
        );
        mailSender.send(user.getEmail(), "CRAFT. Пробоная тренировка.", massage);
    }

    public void sendToAdminThatUserHaveFirstTrain(BaseUser user, Train train) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(train.getStartTrain());
        String type = "type";
        try {
            Annotation[] annotations = CompetitionType.class.getField(train.getType().name()).getAnnotations();
            JsonProperty properties = (JsonProperty) annotations[0];
            type = properties.value();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
        calendar.add(Calendar.HOUR, 3);
        String massage = String.format(
                "Пользователь %s записался на пробную тренировку: %s.\n" +
                "Дата проведения тренировки: %s",
                user.getFirstName() + " " + user.getLastName(),
                type,
                        normalizeDateItemForMessage(calendar.get(Calendar.HOUR_OF_DAY)) + ":" +
                        normalizeDateItemForMessage(calendar.get(Calendar.MINUTE)) + " " +
                        normalizeDateItemForMessage(calendar.get(Calendar.DAY_OF_MONTH)) + "." +
                        normalizeDateItemForMessage(calendar.get(Calendar.MONTH) + 1) + "." +
                        calendar.get(Calendar.YEAR) + "\n"
        );
        mailSender.send("alexisbest1@mail.ru", "CRAFT. Запись на пробную тренировку.", massage);
    }

    public void sendCustomMessage(String subject, String message){
        //List<BaseUser> users = userRepo.findAll();
        List<BaseUser> users = new ArrayList<>();
        BaseUser u1 = userRepo.findByUsername("sasha").orElse(null);
        BaseUser u2 = userRepo.findByUsername("nikita").orElse(null);
        users.add(u1);
        users.add(u2);
        users.forEach(user -> {
            mailSender.send(user.getEmail(),subject, message);
        });
    }
    private String normalizeDateItemForMessage(int date) {
        return date < 10 ? "0" + date : "" + date;
    }


}
