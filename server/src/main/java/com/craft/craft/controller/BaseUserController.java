package com.craft.craft.controller;

import com.craft.craft.dto.ProfileBaseUserResponseDto;
import com.craft.craft.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/profile")
@RequiredArgsConstructor
public class BaseUserController {

    private final UserService userService;

    //ProfileBaseUserResponseDto
    @GetMapping("/{username}")
    public ProfileBaseUserResponseDto getUserByUsername(@PathVariable String username){
        return  ProfileBaseUserResponseDto.getDtoFromBaseUser(userService.findByUsername(username));
    }
}
