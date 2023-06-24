package com.craft.craft.controller;

import com.craft.craft.model.TestClass;
import com.craft.craft.repository.TestClassRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/test")
public class TestClassController {

    @Autowired
    private TestClassRepo repo;

    @GetMapping("/fill-db")
    public List<TestClass> getUser(){
        List<TestClass> tests = new ArrayList<>();
        for(int i = 0; i<5;i++){
            TestClass t = new TestClass("user"+i, "user"+i+"@gmail.com");
            repo.save(t);
            System.out.println("ЗАПРООООООООС");
        }
        return repo.findAll();
    }

    @GetMapping("/{name}")
    public TestClass getUser(@PathVariable String name){
        System.out.println("ЗАПРООООООООС");
        return repo.findByName(name);
    }
}
