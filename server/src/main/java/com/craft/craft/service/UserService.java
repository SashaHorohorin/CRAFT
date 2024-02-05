package com.craft.craft.service;

import com.craft.craft.dto.ChangeProfileResponse;
import com.craft.craft.dto.ProfileBaseUserResponseDto;
import com.craft.craft.dto.SetLabIdDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.error.exeption.UserIsAlreadyExistException;
import com.craft.craft.model.sport.CompetitionPair;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.model.user.Role;
import com.craft.craft.model.user.RoleName;
import com.craft.craft.model.user.Status;
import com.craft.craft.repository.user.BaseUserRepo;
import com.craft.craft.service.mail.LabService;
import com.craft.craft.service.mail.MailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final BaseUserRepo userRepo;
    private final MailSender sender;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public BaseUser findByUsername(String username) {
        log.info("In findByUsername({})", username);
        return userRepo.findByUsername(username).orElse(null);
    }

    public BaseUser findByEmail(String email) {
        log.info("In findByEmail({})", email);
        return userRepo.findByEmail(email).orElse(null);
    }

    public BaseUser createUser(BaseUser user) throws UserIsAlreadyExistException {

        if (userRepo.findByEmail(user.getEmail()).isPresent())
            throw new UserIsAlreadyExistException("Пользователь с таким email уже существует");
        if (userRepo.findByUsername(user.getUsername()).isPresent())
            throw new UserIsAlreadyExistException("Пользователь с таким username уже существует");

        user.getRoles().add(new Role(RoleName.BASE));
        user.setStatus(Status.NOT_ACTIVE);
        user.setActivationCode(UUID.randomUUID().toString());
        BaseUser ret = userRepo.save(user);
        String massage = String.format(
                "Привет, %s \n" +
                        "Добро пожаловать в CRAFT. Для активации аккаунта пожалуста перейдите по ссылке:" +
                        "https://craft-bc.ru/activate-account/%s",
                ret.getFirstName() + " " + ret.getLastName(),
                ret.getActivationCode()
        );
        sender.send(ret.getEmail(), "CRAFT. Активация аккаунта", massage);
        return ret;
    }

    public BaseUser createUserFromFirstTrainForm(BaseUser user) throws UserIsAlreadyExistException {
        if (userRepo.findByEmail(user.getEmail()).isPresent())
            throw new UserIsAlreadyExistException("Пользователь с таким email уже существует");
        if (userRepo.findByPhoneNumber(user.getPhoneNumber()).isPresent())
            throw new UserIsAlreadyExistException("Пользователь с таким номером телефона уже существует");
        user.getRoles().add(new Role(RoleName.BASE));
        user.setStatus(Status.ACTIVE);
        return userRepo.save(user);
    }

    public boolean activateUser(String code) {
        BaseUser user = userRepo.findByActivationCode(code).orElse(null);
        if (user == null)
            return false;
        user.setActivationCode(null);
        user.setStatus(Status.ACTIVE);
        userRepo.save(user);
        return true;
    }

    public BaseUser updateUser(BaseUser user) {
        log.info("In save(user) with userId({})", user.getId());

        return userRepo.save(user);
    }

    public List<BaseUser> findAll() {
        log.info("In findAll()");
        return userRepo.findAll();
    }

    public BaseUser updateLabId(String username) throws ModelNotFoundException {
        BaseUser user = userRepo.findByUsername(username).orElseThrow(
                () -> new ModelNotFoundException("По данному username пользователь не найден"));
        user.setRating(LabService.getUserRating(user.getLabId()));
        return userRepo.save(user);
    }

    public BaseUser setLabId(SetLabIdDto dto) throws ModelNotFoundException {
        BaseUser user = userRepo.findByUsername(dto.getUsername()).orElseThrow(
                () -> new ModelNotFoundException("По данному username пользователь не найден"));
        user.setLabId(dto.getLabID());
        return userRepo.save(user);
    }

    public List<BaseUser> findAllWithoutPair(UUID competitionId) {
        List<BaseUser> users = userRepo.findAll();
        return users.stream().filter(u -> {
            Set<CompetitionPair> pairs = u.getCompetitionPairs();
            long count = pairs.stream().filter(p -> p.getCompetition().getId().equals(competitionId)).count();
            return count <= 0 && !u.getRoles().contains(new Role(RoleName.ADMIN));
        }).collect(Collectors.toList());

    }

    public void sendCodeToChangePassword(String email) throws ModelNotFoundException {
        BaseUser user = userRepo.findByEmail(email).orElseThrow(() -> new ModelNotFoundException("Пользователь с таким email не найден"));
        String code = new Random()
                .ints()
                .boxed()
                .filter(num -> num > 0)
                .limit(6)
                .map(v -> String.valueOf(v).charAt(0))
                .collect(Collector.of(
                        StringBuilder::new,
                        StringBuilder::append,
                        StringBuilder::append,
                        StringBuilder::toString));
        user.setChangePasswordCode(code);
        userRepo.save(user);
        String massage = String.format(
                "Ваш код для смены пароля: %s", code
        );
        sender.send(email, "CRAFT. Код для смены пароля.", massage);
    }

    public String checkCodeForChangePassword(String code) throws ModelNotFoundException {
        BaseUser user = userRepo.findByChangePasswordCode(code)
                .orElseThrow(() -> new ModelNotFoundException("Пользователь с таким кодом сброса пароля не найден"));
        user.setCanChangePassword(true);
        userRepo.save(user);
        return user.getUsername();
    }

    public boolean changePassword(String username, String password, String repeatedPassword) throws ModelNotFoundException {
        if (!password.equals(repeatedPassword)) throw new ModelNotFoundException("Пароли не совпадают");
        BaseUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new ModelNotFoundException("Пользователь с таким username не найден"));
        if (
                !(user.getCanChangePassword() != null
                        && user.getCanChangePassword()
                )
        ) throw new ModelNotFoundException("Нельзя сменить пароль без подтверждения кода сброса пароля");
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        user.setPassword(encodedPassword);
        user.setCanChangePassword(false);
        user.setChangePasswordCode(null);
        userRepo.save(user);
        return true;
    }

    public ProfileBaseUserResponseDto changeProfile(ChangeProfileResponse resp) throws ModelNotFoundException {
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        BaseUser user = userRepo.findByUsername(username).orElseThrow(()-> new ModelNotFoundException("Нет пользователя"));
        if(!resp.getEmail().equals("")){
            user.setEmail(resp.getEmail());
        }
        if(!resp.getPhoneNumber().equals("")){
            user.setPhoneNumber(resp.getPhoneNumber());
        }
        if(!resp.getFirstName().equals("")){
            user.setFirstName(resp.getFirstName());
        }
        if(!resp.getLastName().equals("")){
            user.setLastName(resp.getLastName());
        }
        if(resp.getIdRating() != 0){
            user.setLabId(resp.getIdRating());
        }
        BaseUser ret = userRepo.save(user);
        return ProfileBaseUserResponseDto.getDtoFromBaseUser(ret);
    }
}
