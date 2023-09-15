package com.craft.craft.service.mail;


import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionType;
import com.craft.craft.model.sport.Train;
import com.craft.craft.model.user.BaseUser;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.annotation.Annotation;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MailingService {

    @Autowired
    private MailSender mailSender;

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
            return "" + type + " " + competition.getCategory() +
                    " - дата проведения: " + normalizeDateItemForMessage(calendar.get(Calendar.HOUR)) + ":" +
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
        String massage = String.format(
                "Пользователь %s записался на пробную тренировку: %s.\n" +
                "Дата проведения тренировки: %s",
                user.getFirstName() + " " + user.getLastName(),
                train.getType(),
                        normalizeDateItemForMessage(calendar.get(Calendar.DAY_OF_MONTH)) + "." +
                        normalizeDateItemForMessage(calendar.get(Calendar.MONTH) + 1) + "." +
                        calendar.get(Calendar.YEAR) + "\n"
        );
        mailSender.send("alexisbest1@mail.ru", "CRAFT. Запись на пробную тренировку.", massage);
        mailSender.send("rdsrdsrds2001@gmail.com", "CRAFT. Запись на пробную тренировку.", massage);
    }


    private String normalizeDateItemForMessage(int date) {
        return date < 10 ? "0" + date : "" + date;
    }
}
