package com.craft.craft.error.exeption;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Data
public class PasswordNotMatchException extends Exception {
    @NonNull
    private String message;
    private HttpStatus status;
}
