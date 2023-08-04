package com.craft.craft.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtsResponse {
    private String username;
    private Collection<String> roles;
    private String accessToken;
    private String refreshToken;
    private Integer rating;
}
