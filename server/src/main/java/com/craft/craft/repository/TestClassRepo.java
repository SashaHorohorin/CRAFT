package com.craft.craft.repository;

import com.craft.craft.model.TestClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TestClassRepo extends JpaRepository<TestClass,UUID> {
    TestClass findByName (String name);
}
