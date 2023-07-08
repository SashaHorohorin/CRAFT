package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class AuthRegisterDto {

    @NotNull(message = "Имя не может быть пустым")
    @NotBlank(message = "Имя не может быть пустым")
    public String firstName;
    public String lastName;
    @Email(message = "Email введен неверно")
    @NotNull(message = "Email не может быть пустым")
    @NotBlank(message = "Email не может быть пустым")
    private String email;
    @NotBlank(message = "Телефон не может быть пустым")
    @Pattern(regexp = "^((8|\\+7)\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2})$", message = "Телефон введен неверно")
    private String phoneNumber;
    @NotNull(message = "Пароль не может быть пустым")
    @NotBlank(message = "Пароль не может быть пустым")
    private String password;
    @NotNull(message = "Подтвердите пароль")
    @NotBlank(message = "Подтвердите пароль")
    private String confirmationPassword;
    private boolean agreementDataProcessing;
    private boolean agreementMailing;

}
