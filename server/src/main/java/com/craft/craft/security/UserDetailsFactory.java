package com.craft.craft.security;

import com.craft.craft.model.user.BaseUser;
import com.craft.craft.model.user.Role;
import com.craft.craft.model.user.Status;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;

public final class UserDetailsFactory {
    public UserDetailsFactory() {
    }

    public static UserDetailsImpl create(BaseUser user){

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                user.getEmail(),
                user.getStatus().equals(Status.ACTIVE),
                user.getUpdated(),
                mapToGrantedAuthorities(user.getRoles())
        );
    }
    private static List<GrantedAuthority> mapToGrantedAuthorities(Collection<Role> userRoles){
        return userRoles.stream()
                .map(role ->
                        new SimpleGrantedAuthority(role.getName().name())
                ).collect(Collectors.toList());
    }
}
