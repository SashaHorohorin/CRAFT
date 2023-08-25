package com.craft.craft.error.exeption;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class FullTrainException extends Exception {
    @NonNull
    private String message;
    private HttpStatus status;
}
