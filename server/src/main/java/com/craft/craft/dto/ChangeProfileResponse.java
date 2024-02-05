package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Access;
import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeProfileResponse {
    @NotNull
    @NotBlank(message = "Please enter your firstName")
    private String firstName;
    @NotNull
    @NotBlank(message = "Please enter your lastName")
    private String lastName;
    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Please enter your email")
    @NotNull
    private String email;
    @NotBlank(message = "Please enter your phoneNumber")
    @NotNull
    private String phoneNumber;
    @NotBlank(message = "Please enter your labId")
    @NotNull
    private Integer idRating;
}
