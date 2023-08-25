package com.craft.craft.repository.user;

import com.craft.craft.model.user.BaseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;
import java.util.UUID;

@NoRepositoryBean
public interface AbstractBaseUserRepo<T extends BaseUser> extends JpaRepository<T, UUID> {
    Optional<T> findByUsername(String username);
}
