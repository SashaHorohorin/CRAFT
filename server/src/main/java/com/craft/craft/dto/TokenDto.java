package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {
    @NotNull(message = "Username не может быть пустым")
    @NotBlank(message = "Нет поля username")
    private String username;
    @NotNull(message = "token не может быть пустым")
    @NotBlank(message = "Нет поля token")
    private String token;

}
