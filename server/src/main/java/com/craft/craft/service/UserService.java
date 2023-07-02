package com.craft.craft.service;

import com.craft.craft.model.user.BaseUser;
import com.craft.craft.repository.user.BaseUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private BaseUserRepo userRepo;

    public BaseUser findByUsername(String username){
        return userRepo.findByUsername(username).orElse(null);
    }
    public BaseUser save(BaseUser user){
        return userRepo.save(user);
    }
    public List<BaseUser> findAll(){
        return userRepo.findAll();
    }
}
