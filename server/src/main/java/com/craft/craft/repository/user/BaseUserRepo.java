package com.craft.craft.repository.user;

import com.craft.craft.model.user.BaseUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface BaseUserRepo extends AbstractBaseUserRepo<BaseUser> {
    Optional<BaseUser> findByActivationCode(String activationCode);
    Optional<BaseUser> findByEmail(String email);
}