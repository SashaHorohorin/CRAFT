package com.craft.craft.error.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
public class TokenInvalidException extends Exception {
    private String message;
    private HttpStatus status;
}
