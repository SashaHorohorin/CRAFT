package com.craft.craft.controller;

import com.craft.craft.config.JwtSecurityConfig;
import com.craft.craft.dto.auth.AuthLoginDto;
import com.craft.craft.dto.auth.AuthRegisterDto;
import com.craft.craft.dto.auth.JwtsResponse;
import com.craft.craft.dto.auth.TokenDto;
import com.craft.craft.error.exeption.*;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.security.jwt.JwtAuthenticationException;
import com.craft.craft.security.jwt.JwtTokenProvider;
import com.craft.craft.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Import(JwtSecurityConfig.class)

@RestController
@RequestMapping(value = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Operation(
            summary = "Вход пользователя"
    )
    @PostMapping("/login")
    public JwtsResponse login(@Valid @RequestBody AuthLoginDto requestDto) throws EmailNotActiveException{
        try {
            String email = requestDto.getEmail();
            BaseUser user = userService.findByEmail(email);
            if (user == null) {
                throw new UsernameNotFoundException("User with email: " + email + " not found.");
            }
            if(user.getActivationCode() != null){
                throw new EmailNotActiveException("Необходимо подтвердить почту");
            }
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), requestDto.getPassword()));
            String tokenAccess = jwtTokenProvider.createAccessToken(user.getUsername(), user.getRoles());
            String tokenRefresh = jwtTokenProvider.createRefreshToken(user.getUsername());
            List<String> roles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());
            return new JwtsResponse(user.getUsername(), roles, tokenAccess, tokenRefresh, user.getRating());
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Неверное имя пользователя или пароль");
        }
    }

    @Operation(
            summary = "Регистрация пользователя"
    )
    @PostMapping("/register")
    public void register(@Valid @RequestBody AuthRegisterDto requestDto) throws PasswordNotMatchException, UserIsAlreadyExistException {
        if (!requestDto.getPassword().equals(requestDto.getConfirmationPassword()))
            throw new PasswordNotMatchException("Пароли не совпадают");
        BaseUser user = new BaseUser(
                requestDto.getFirstName(),
                requestDto.getLastName(),
                requestDto.getEmail(),
                requestDto.getPhoneNumber(),
                bCryptPasswordEncoder.encode(requestDto.getPassword())
        );
        user.setAgreementDataProcessing(requestDto.isAgreementDataProcessing());
        user.setAgreementMailing(requestDto.isAgreementMailing());
        userService.createUser(user);
    }

    @GetMapping("/activate/{code}")
    public boolean activateAccount(@PathVariable String code) {
        return userService.activateUser(code);
    }

    @Operation(
            summary = "Обновление токена",
            description = "Обновляет access токен по refresh токену"
    )
    @PostMapping("/access-token")
    public TokenDto updateAccessToken(@Valid @RequestBody TokenDto tokenDto) throws TokenInvalidException, ModelNotFoundException {
        String refreshToken = tokenDto.getToken();

        try {
            if (refreshToken != null && jwtTokenProvider.validateRefreshToken(refreshToken)) {
                BaseUser user = userService.findByUsername(
                        jwtTokenProvider.getUsernameFromRefreshToken(refreshToken)
                );
                if(user == null) throw new ModelNotFoundException("Пользователь по refresh token не найден");
                String newToken = jwtTokenProvider.createAccessToken(user.getUsername(), user.getRoles());
                return new TokenDto(user.getUsername(), newToken);
            } else
                throw new TokenInvalidException("Refresh token is not valid", HttpStatus.BAD_REQUEST);
        } catch (JwtAuthenticationException e){
            throw new TokenInvalidException("Refresh token is expired", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/refresh")
    public JwtsResponse refresh(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        String token = bearer.substring(7);
        String username = jwtTokenProvider.getUsernameFromAccessToken(token);
        BaseUser user = userService.findByUsername(username);
        String tokenAccess = jwtTokenProvider.createAccessToken(username, user.getRoles());
        String tokenRefresh = jwtTokenProvider.createRefreshToken(user.getUsername());
        List<String> roles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());
        return new JwtsResponse(user.getUsername(), roles, tokenAccess, tokenRefresh, user.getRating());
    }

//
//    @PostMapping("/refresh-token")
//    public ResponseEntity updateRefreshToken(@RequestBody TokenDto tokenDto){
//
//        String refreshToken = tokenDto.getRefreshToken();
//        if(refreshToken!=null && jwtTokenProvider.validateRefreshToken(refreshToken)) {
//            BaseUser user = userService.findByUsername(
//                    jwtTokenProvider.getUsernameFromRefreshToken(refreshToken)
//            );
//            String newToken = jwtTokenProvider.createAccessToken(user.getUsername(), user.getRoles());
//            String newRefresh = jwtTokenProvider.createRefreshToken(user.getUsername());
//            Map<Object, Object> response = new HashMap<>();
//            response.put("username", user.getUsername());
//            response.put("token", newToken);
//            response.put("refreshtoken", newRefresh);
//            return ResponseEntity.ok(response);
//        }
//        else
//            return new ResponseEntity("refresh token is not valid", HttpStatus.BAD_REQUEST);
//    }
}
