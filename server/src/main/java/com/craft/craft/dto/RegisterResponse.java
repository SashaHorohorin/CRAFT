package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponse {
    private String username;
    private Collection<String> roles;
    private String accessToken;
    private String refreshToken;
    private String activateCode;
}
