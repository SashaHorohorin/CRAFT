package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtsResponse {
    private String accessToken;
    private String refreshToken;
}
