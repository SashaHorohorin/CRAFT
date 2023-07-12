package com.craft.craft.error.handler;

import com.craft.craft.error.ErrorResponse;
import com.craft.craft.error.ValidExceptionBody;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.error.exeption.UserIsAlreadyExistException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class DataExceptionHandler {

    @ExceptionHandler(ModelNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleError(ModelNotFoundException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstrainException(MethodArgumentNotValidException e) {
        List<ValidExceptionBody> errors = e.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> new ValidExceptionBody(error.getObjectName(),error.getDefaultMessage(),error.getRejectedValue().toString(),error.getField()))
                .collect(Collectors.toList());
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value() , "Valid exceptions", errors);
    }


    @ExceptionHandler(UserIsAlreadyExistException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstrainException(UserIsAlreadyExistException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }
}
