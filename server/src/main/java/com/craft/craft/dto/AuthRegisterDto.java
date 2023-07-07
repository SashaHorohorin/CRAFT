package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthRegisterDto {

    public String firstName;
    public String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    private String confirmationPassword;
    protected String username;
    private boolean agreementDataProcessing;
    private boolean agreementMailing;

}
