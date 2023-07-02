package com.craft.craft.service;

import com.craft.craft.model.user.Admin;
import com.craft.craft.repository.user.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Admin findByUsername(String username){
        return adminRepo.findByUsername(username).orElse(null);
    }
    public Admin save(Admin user){
        return adminRepo.save(user);
    }

    public List<Admin> findAll(){
        return adminRepo.findAll();
    }

}
