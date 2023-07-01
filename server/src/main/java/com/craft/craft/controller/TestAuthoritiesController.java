package com.craft.craft.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestAuthoritiesController {

    @GetMapping("/admin")
    public String admin(){

        return "ADMIN ROLE";
    }

    @GetMapping("/base")
    public String base(){

        return "BASE ROLE";
    }
}
