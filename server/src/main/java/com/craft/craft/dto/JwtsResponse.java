package com.craft.craft.dto;

import com.craft.craft.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtsResponse {
    private String username;
    private Collection<String> roles;
    private String accessToken;
    private String refreshToken;
}
