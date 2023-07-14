package com.craft.craft.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class AuthRegisterDto {

    @NotNull(message = "Имя не может быть пустым")
    @NotBlank(message = "Нет имени")
    public String firstName;
    @NotNull(message = "Фамилия не может быть пустым")
    @NotBlank(message = "Нет фамилии")
    public String lastName;
    @Email(message = "Email введен неверно")
    @NotNull(message = "Email не может быть пустым")
    @NotBlank(message = "Нет Email")
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
    @AssertTrue
    private boolean agreementDataProcessing;
    private boolean agreementMailing;

}
