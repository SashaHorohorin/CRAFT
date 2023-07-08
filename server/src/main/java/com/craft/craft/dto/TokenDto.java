package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class TokenDto {
    @NotNull(message = "Username не может быть пустым")
    @NotBlank(message = "Username не может быть пустым")
    private String username;
    @NotNull(message = "token не может быть пустым")
    @NotBlank(message = "token не может быть пустым")
    private String token;

}
