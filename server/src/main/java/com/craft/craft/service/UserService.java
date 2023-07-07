package com.craft.craft.service;

import com.craft.craft.model.user.BaseUser;
import com.craft.craft.repository.user.BaseUserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserService {

    @Autowired
    private BaseUserRepo userRepo;

    public BaseUser findByUsername(String username){
        log.info("In findByUsername({})", username);
        return userRepo.findByUsername(username).orElse(null);
    }
    public BaseUser save(BaseUser user){
        log.info("In save(user) with userId({})", user.getId());
        return userRepo.save(user);
    }
    public List<BaseUser> findAll(){
        log.info("In findAll()");
        return userRepo.findAll();
    }
}
