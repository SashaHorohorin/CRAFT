package com.craft.craft.controller;

import com.craft.craft.config.JwtSecurityConfig;
import com.craft.craft.dto.AuthRegisterDto;
import com.craft.craft.dto.AuthRequestDto;
import com.craft.craft.dto.JwtsResponse;
import com.craft.craft.dto.TokenDto;
import com.craft.craft.error.exeption.PasswordNotMatchException;
import com.craft.craft.error.exeption.TokenInvalidException;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.model.user.Role;
import com.craft.craft.model.user.RoleName;
import com.craft.craft.security.jwt.JwtTokenProvider;
import com.craft.craft.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Import(JwtSecurityConfig.class)
@RestController
@RequestMapping(value = "/api/v1/auth/")
public class AuthRestController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Operation(
            summary = "Вход пользователя"
    )
    @PostMapping("/login")
    public JwtsResponse login(@RequestBody AuthRequestDto requestDto){
        try {
            String username = requestDto.getUsername();
            BaseUser user = userService.findByUsername(username);
            if(user == null){
                throw new UsernameNotFoundException("User with username: " + username + " not found.");
            }
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, requestDto.getPassword()));
            String tokenAccess = jwtTokenProvider.createAccessToken(username, user.getRoles());
            String tokenRefresh = jwtTokenProvider.createRefreshToken(username);
            return  new JwtsResponse(tokenAccess, tokenRefresh);
        }catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @Operation(
            summary = "Регистрация пользователя"
    )
    @PostMapping("/register")
    public void register(@RequestBody AuthRegisterDto requestDto) throws PasswordNotMatchException {
        if(!requestDto.getPassword().equals(requestDto.getConfirmationPassword()))
            throw new PasswordNotMatchException("Пароли не совпадают");
        BaseUser user = new BaseUser(
                requestDto.getFirstName(),
                requestDto.getLastName(),
                requestDto.getEmail(),
                requestDto.getPhoneNumber(),
                bCryptPasswordEncoder.encode(requestDto.getPassword())
        );
        user.getRoles().add(new Role(RoleName.BASE));
        userService.save(user);
    }


    @Operation(
            summary = "Обновление токена",
            description = "Обновляет access токен по refresh токену"
    )
    @PostMapping("/access-token")
    public TokenDto updateAccessToken(@RequestBody TokenDto tokenDto) throws TokenInvalidException {
        String refreshToken = tokenDto.getToken();
        if(refreshToken != null && jwtTokenProvider.validateRefreshToken(refreshToken)) {
            BaseUser user = userService.findByUsername(
                    jwtTokenProvider.getUsernameFromRefreshToken(refreshToken)
            );
            String newToken = jwtTokenProvider.createAccessToken(user.getUsername(), user.getRoles());
            return new TokenDto(user.getUsername(), newToken);
        }
        else
            throw new TokenInvalidException("Refresh token is not valid", HttpStatus.BAD_REQUEST);

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
//
//    }
}
