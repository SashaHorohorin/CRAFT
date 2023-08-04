package com.craft.craft.controller;

import com.craft.craft.dto.SetLabIdDto;
import com.craft.craft.dto.sport.ProfileBaseUserResponseDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/profile")
@RequiredArgsConstructor
public class BaseUserController {

    private final UserService userService;

    @GetMapping("/{username}")
    public ProfileBaseUserResponseDto getUserByUsername(@PathVariable String username){
        return  ProfileBaseUserResponseDto.getDtoFromBaseUser(userService.findByUsername(username));
    }

    @PostMapping("/set-lab-id")
    public ProfileBaseUserResponseDto setLabId(SetLabIdDto dto) throws ModelNotFoundException {
        return ProfileBaseUserResponseDto.getDtoFromBaseUser(userService.setLabId(dto));
    }
}
