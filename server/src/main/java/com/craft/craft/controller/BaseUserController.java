package com.craft.craft.controller;

import com.craft.craft.model.user.BaseUser;
import com.craft.craft.model.user.Status;
import com.craft.craft.repository.user.BaseUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController

@RequestMapping("/user")
public class BaseUserController {

    @Autowired
    private BaseUserRepo baseUserRepo;

    @GetMapping("/fill-db")
    public List<BaseUser> fill(){
        List<BaseUser> tests = new ArrayList<>();
        for(int i = 0; i<5;i++){
            BaseUser u = new BaseUser("firstName"+i,
                    "secondName"+i,
                    "email"+i+"@gmail.com",
                    "8(352)823-92-1"+i,
                    "password"+i
            );
            baseUserRepo.save(u);
        }
        return baseUserRepo.findAll();
    }

    @GetMapping("/get-all")
    public List<BaseUser> getAll(){
        return baseUserRepo.findAll();
    }
}
