package com.craft.craft.controller;

import com.craft.craft.service.UserService;
import com.craft.craft.service.mail.MailingService;
import com.craft.craft.service.sport.CompetitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mailing")
@RequiredArgsConstructor
public class MailingController {

    private final MailingService messages;
    private final UserService userService;
    private final CompetitionService competitionService;

    @GetMapping("/about-created-trains")
    public void mailingAboutCreatedTrains(){
        messages.mailingAboutCreatedTrains(userService.findAll());
    }

    @GetMapping("/about-created-competitions")
    public void mailingAboutCreatedCompetitions(){
        messages.mailingAboutCreatedCompetitions(userService.findAll(), competitionService.findAllActive());
    }
}
