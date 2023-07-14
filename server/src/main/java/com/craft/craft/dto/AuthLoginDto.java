package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthLoginDto {
    @Email(message = "Email введен неверно")
    @NotNull(message = "Email не может быть пустым")
    private String email;
    @NotNull(message = "Пароль не может быть пустым")
    private String password;
}
