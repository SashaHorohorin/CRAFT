package com.craft.craft.error.handler;

import com.craft.craft.error.ErrorResponse;
import com.craft.craft.error.exeption.TokenInvalidException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleError(BadCredentialsException e) {
        return new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
    }

    @ExceptionHandler(TokenInvalidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleError(TokenInvalidException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value() , e.getMessage());
    }
}
