package com.craft.craft.controller;

import com.craft.craft.dto.*;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/profile")
@RequiredArgsConstructor
public class BaseUserController {

    private final UserService userService;

    @GetMapping("/{username}")
    public ProfileBaseUserResponseDto getUserByUsername(@PathVariable String username) {
        return ProfileBaseUserResponseDto.getDtoFromBaseUser(userService.findByUsername(username));
    }

    @GetMapping("/{username}/with-rating")
    public ProfileBaseUserResponseDto getProfileWithRating(@PathVariable String username) throws ModelNotFoundException {
        return ProfileBaseUserResponseDto.getDtoFromBaseUser(userService.updateLabId(username));
    }

    @PostMapping("/set-lab-id")
    public Boolean setLAbId(@RequestBody SetLabIdDto dto) throws ModelNotFoundException {
        userService.setLabId(dto);
        return true;
    }

    @GetMapping("/find-all")
    public List<FindUserDto> getAll() {
        return userService.findAll().stream().map(FindUserDto::getDtoFromUser).collect(Collectors.toList());
    }

    @GetMapping("/find-all-in-competition-without-pair/{competitionId}")
    public List<FindUserDto> getAllWithoutPair(@PathVariable UUID competitionId) {
        return userService.findAllWithoutPair(competitionId).stream().map(FindUserDto::getDtoFromUser).collect(Collectors.toList());
    }

    @PostMapping("/reset/send-change-password-code")
    public void sendCodeForChangePassword(@RequestBody String email) throws ModelNotFoundException {
        System.out.println(email);
        userService.sendCodeToChangePassword(email);
    }

    @PostMapping("/reset/confirm-change-password-code")
    public String confirmCodeForChangePassword(@RequestBody String code) throws ModelNotFoundException {
        return userService.checkCodeForChangePassword(code);
    }

    @PostMapping("/reset/change-password")
    public Boolean changePassword(@RequestBody ChangePasswordDto changePasswordDto) throws ModelNotFoundException {
        return userService.changePassword(
                changePasswordDto.getUsername(),
                changePasswordDto.getPassword(),
                changePasswordDto.getRepeatedPassword()
                );
    }
    @PostMapping("/change/data")
    public ProfileBaseUserResponseDto changeProfile(@RequestBody ChangeProfileResponse response) throws ModelNotFoundException {
        return userService.changeProfile(response);
    }
}
