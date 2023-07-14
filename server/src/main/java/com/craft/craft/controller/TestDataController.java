package com.craft.craft.controller;

import com.craft.craft.dto.*;
import com.craft.craft.dto.info.CraftInfoCardRequestDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.info.CraftInfoCard;
import com.craft.craft.model.info.InfoCardStatus;
import com.craft.craft.model.sport.SportComplex;
import com.craft.craft.model.sport.Train;
import com.craft.craft.model.sport.TrainType;
import com.craft.craft.model.sport.Trainer;
import com.craft.craft.model.user.*;
import com.craft.craft.repository.sport.TrainRepo;
import com.craft.craft.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController

@RequestMapping("/user")
public class TestDataController {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UserService baseUserService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private CraftInfoCardService craftInfoCardService;
    @Autowired
    private TrainerService trainerService;
    @Autowired
    private TrainRepo trainRepo;
    @Autowired
    private TrainService trainService;

    @GetMapping("/fill-db")
    public String fill(){
        for(int i = 0; i<5;i++){
            BaseUser u = new BaseUser("firstName"+i,
                    "secondName"+i,
                    "email"+i+"@gmail.com",
                    "8(352)823-92-1"+i,
                    passwordEncoder.encode("password"+i)
            );
            u.getRoles().add(new Role(RoleName.BASE));
            u.setStatus(Status.ACTIVE);
            baseUserService.updateUser(u);
        }
        Admin admin = new Admin("admin",
                "admin",
                "nikita-pirogov-artur@gmail.com",
                "8(999)999-99-99",
                passwordEncoder.encode("admin")
        );
        admin.setStatus(Status.ACTIVE);
        adminService.save(admin);

        CraftInfoCard card1 = new CraftInfoCard(
                "./images/HomePage/why-club/card-left-1.png",
                "Растим чемпионов!",
                "Растим чемпионов!",
                "Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации!",
                "Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно подсказывают прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!",
                InfoCardStatus.ACTIVE, admin);
        CraftInfoCard card2 = new CraftInfoCard(
                "./images/HomePage/why-club/card-left-1.png",
                "Растим чемпионов!",
                "Растим чемпионов!",
                "Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации!",
                "Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно подсказывают прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!",
                InfoCardStatus.ACTIVE,
                admin
        );
        CraftInfoCard card3 = new CraftInfoCard(
                "./images/HomePage/why-club/card-right.png",
                "Комьюнити единомышлеников",
                "Растим чемпионов!",
                "",
                "Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно подсказывают прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!",
                InfoCardStatus.ACTIVE,
                admin
        );

        craftInfoCardService.save(card1);
        craftInfoCardService.save(card2);
        craftInfoCardService.save(card3);

        BaseUser base = new BaseUser("base",
                "base",
                "base@gmail.com",
                "8(111)111-11-11",
                passwordEncoder.encode("base")
        );
        base.getRoles().add(new Role(RoleName.BASE));
        base.setStatus(Status.ACTIVE);
        baseUserService.updateUser(base);

        Trainer trainer = new Trainer("NAME","URL","textFront", "textBack", InfoCardStatus.ACTIVE);
        Trainer trainer2 = new Trainer("NAME2","URL","textFront", "textBack", InfoCardStatus.ACTIVE);
       // trainer.setAuthor(admin);
       // trainer2.setAuthor(admin);
        Train train = new Train(TrainType.GAME, new Date(), new Date(), 10, SportComplex.DINAMIT);
        trainer.getTrains().add(train);
        trainerService.save(trainer);
        trainerService.save(trainer2);
        return "READY";
    }

    @GetMapping("/get-all")
    public List<BaseUserDataDto> getAll(){
        List<BaseUser> users =  baseUserService.findAll();
        return users.stream().map(BaseUserDataDto::getDtoFromBaseUser)
        .collect(Collectors.toList());
    }
    @GetMapping("/get-all-admins")
    public List<AdminDto> getAllAdmins(){
        List<Admin> users =  adminService.findAll();
        return users.stream().map(AdminDto::getDtoFromAdmin)
                .collect(Collectors.toList());
    }


    @GetMapping("/add-card/{username}")
    public CraftInfoCardRequestDto addCard(@PathVariable String username) throws ModelNotFoundException {
        Admin admin = (Admin) baseUserService.findByUsername(username);
        CraftInfoCard card = new CraftInfoCard("test","test","test","test","test", InfoCardStatus.ACTIVE, admin);
        return CraftInfoCardRequestDto.getDtoFromCraftInfoCard(craftInfoCardService.save(card));
    }

    @GetMapping("/get-all-actives-cards")
    public List<CraftInfoCardRequestDto> getAllCard(){
        return craftInfoCardService.getAllByStatus(InfoCardStatus.ACTIVE).stream().map(CraftInfoCardRequestDto::getDtoFromCraftInfoCard).collect(Collectors.toList());
    }



    @GetMapping("/test-cascade")
    public String test(){
        //Train train = new Train(new Date(), new Date());
        Admin admin = new Admin("admins",
                "admins",
                "nikita-pirogov-artur@gmail.com",
                "8(999)999-99-91",
                passwordEncoder.encode("admins")
        );
        admin.setStatus(Status.ACTIVE);
        adminService.save(admin);
        Trainer trainer = new Trainer("NAME","URL","textFront", "textBack", InfoCardStatus.ACTIVE);
        //trainer.setAuthor(admin);
        Train train = new Train(TrainType.GAME, new Date(), new Date(),10, SportComplex.IMPULS);
        train.getTrainers().add(trainer);
        trainRepo.save(train);
        return "YEEES";
    }

    @GetMapping("/test-cascade1")
    public String test1(){
        Trainer t1 = trainerService.getAll().get(0);
        Train train = trainRepo.findAll().get(0);
        train.getTrainers().add(t1);
        trainRepo.save(train);
        return "YEEES1";
    }

}
