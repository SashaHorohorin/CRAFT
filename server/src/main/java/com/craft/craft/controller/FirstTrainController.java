package com.craft.craft.controller;


import com.craft.craft.dto.FirstTrainRegisterDto;
import com.craft.craft.dto.auth.JwtsResponse;
import com.craft.craft.error.exeption.UserIsAlreadyExistException;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.security.jwt.JwtTokenProvider;
import com.craft.craft.service.UserService;
import com.craft.craft.service.mail.MailingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/first-train-form")
@RequiredArgsConstructor
public class FirstTrainController {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserService userService;
    private final MailingService mailingService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public JwtsResponse register(@RequestBody FirstTrainRegisterDto registerDto) throws UserIsAlreadyExistException {
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 7;
        Random random = new Random();
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        BaseUser user = new BaseUser(
                registerDto.getFirstName(),
                registerDto.getLastName(),
                registerDto.getEmail(),
                registerDto.getPhoneNumber(),
                bCryptPasswordEncoder.encode(generatedString)
        );
        user.setAgreementDataProcessing(true);
        user.setAgreementMailing(true);
        mailingService.createUserForFirstTrain(userService.createUserFromFirstTrainForm(user), generatedString);
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), generatedString));
            String tokenAccess = jwtTokenProvider.createAccessToken(user.getUsername(), user.getRoles());
            String tokenRefresh = jwtTokenProvider.createRefreshToken(user.getUsername());
            List<String> roles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());
            return new JwtsResponse(user.getUsername(), roles, tokenAccess, tokenRefresh, user.getLabId());
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Неверное имя пользователя или пароль");
        }
    }
}
