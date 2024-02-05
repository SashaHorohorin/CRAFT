package com.craft.craft.controller;

import com.craft.craft.dto.info.SendCustomMessageDto;
import com.craft.craft.service.UserService;
import com.craft.craft.service.mail.MailingService;
import com.craft.craft.service.sport.CompetitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/mailing")
@RequiredArgsConstructor
public class MailingController {

    private final MailingService mailingService;
    private final UserService userService;
    private final CompetitionService competitionService;

    @GetMapping("/about-created-trains")
    public void mailingAboutCreatedTrains(){
        //BaseUser u1 = userService.findByUsername("sasha");
        //BaseUser u2 = userService.findByUsername("nikita");
        //messages.mailingAboutCreatedTrains(List.of(u1,u2));
        mailingService.mailingAboutCreatedTrains(userService.findAll());
    }

    @GetMapping("/about-created-competitions")
    public void mailingAboutCreatedCompetitions(){
        //BaseUser u1 = userService.findByUsername("sasha");
        //BaseUser u2 = userService.findByUsername("nikita");
        //messages.mailingAboutCreatedCompetitions(List.of(u1,u2), competitionService.findAllActive());
        mailingService.mailingAboutCreatedCompetitions(userService.findAll(), competitionService.findAllActive());
    }

    @PostMapping("/send-custom-mail")
    public void sendCustomMessage(@RequestBody SendCustomMessageDto messageDto){
        mailingService.sendCustomMessage(messageDto.getSubject(), messageDto.getMessage());
    }
}
