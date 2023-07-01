package com.craft.craft.controller;

import com.craft.craft.dto.BaseUserDto;
import com.craft.craft.dto.CraftInfoCardDto;
import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.model.user.Role;
import com.craft.craft.model.user.RoleName;
import com.craft.craft.service.CraftInfoCardService;
import com.craft.craft.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController

@RequestMapping("/user")
public class BaseUserController {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UserService baseUserService;
    @Autowired
    private CraftInfoCardService craftInfoCardService;

    @GetMapping("/fill-db")
    public String fill(){
        for(int i = 0; i<5;i++){
            BaseUser u = new BaseUser("firstName"+i,
                    "secondName"+i,
                    "email"+i+"@gmail.com",
                    "8(352)823-92-1"+i,
                    passwordEncoder.encode("password"+i),
                    Collections.singletonList(new Role(RoleName.BASE))
            );
            baseUserService.save(u);
        }
        BaseUser admin = new BaseUser("admin",
                "admin",
                "admin@gmail.com",
                "8(999)999-99-99",
                passwordEncoder.encode("admin"),
                Collections.singletonList(new Role(RoleName.ADMIN))
        );
        baseUserService.save(admin);
        CraftInfoCard card = new CraftInfoCard("url.jpg","header","shortText","mainText", InfoCardStatus.ACTIVE, admin);
        craftInfoCardService.save(card);

        BaseUser base = new BaseUser("base",
                "base",
                "base@gmail.com",
                "8(111)111-11-11",
                passwordEncoder.encode("base"),
                Collections.singletonList(new Role(RoleName.BASE))
        );
        baseUserService.save(base);

        return "READY";
    }

    @GetMapping("/get-all")
    public List<BaseUserDto> getAll(){
        List<BaseUser> users =  baseUserService.findAll();
        return users.stream().map(BaseUserDto::getDtoFromBaseUser)
        .collect(Collectors.toList());
    }

    @GetMapping("/add-card/{username}")
    public CraftInfoCardDto addCard(@PathVariable String username){
        BaseUser admin = baseUserService.findByUsername(username);
        CraftInfoCard card = new CraftInfoCard("test","test","test","test", InfoCardStatus.ACTIVE, admin);
        return CraftInfoCardDto.getDtoFromCraftInfoCard(craftInfoCardService.save(card));
    }
}
