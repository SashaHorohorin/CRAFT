package com.craft.craft.controller;

import com.craft.craft.dto.FindUserDto;
import com.craft.craft.dto.SetLabIdDto;
import com.craft.craft.dto.ProfileBaseUserResponseDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/profile")
@RequiredArgsConstructor
public class BaseUserController {

    private final UserService userService;

    @GetMapping("/{username}")
    public ProfileBaseUserResponseDto getUserByUsername(@PathVariable String username){
        return  ProfileBaseUserResponseDto.getDtoFromBaseUser(userService.findByUsername(username));
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
    public List<FindUserDto> getAll(){
        return userService.findAll().stream().map(FindUserDto::getDtoFromUser).collect(Collectors.toList());
    }

    @GetMapping("/find-all-in-competition-without-pair/{competitionId}")
    public List<FindUserDto> getAllWithoutPair(){
        return userService.findAll().stream().map(FindUserDto::getDtoFromUser).collect(Collectors.toList());
    }
}
