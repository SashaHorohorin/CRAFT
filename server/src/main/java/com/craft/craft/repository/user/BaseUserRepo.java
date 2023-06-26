package com.craft.craft.repository.user;

import com.craft.craft.model.user.BaseUser;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface BaseUserRepo extends AbstractBaseUserRepo<BaseUser> {

}