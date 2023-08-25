package com.craft.craft.service;

import com.craft.craft.model.user.Admin;
import com.craft.craft.repository.user.AdminRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Admin findByUsername(String username){
        log.info("findByUsername({})", username);
        return adminRepo.findByUsername(username).orElse(null);
    }
    public Admin save(Admin user){
        log.info("save(user) with userId({})", user.getId());
        return adminRepo.save(user);
    }

    public List<Admin> findAll(){
        log.info("findAll()");
        return adminRepo.findAll();
    }

}
