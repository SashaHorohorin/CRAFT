package com.craft.craft.error.handler;

import com.craft.craft.error.ErrorResponse;
import com.craft.craft.error.exeption.ModelNotFound;
import com.craft.craft.error.exeption.TokenInvalidException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ModelNotFoundHandler {

    @ExceptionHandler(ModelNotFound.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleError(ModelNotFound e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }

}
