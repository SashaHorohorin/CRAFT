package com.craft.craft.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GoogleRefreshDto {
    @JsonProperty("access_token")
    private String access_token;
    @JsonProperty("expires_in")
    private String expires_in;
    @JsonProperty("scope")
    private String scope;
    @JsonProperty("token_type")
    private String  token_type;
}
