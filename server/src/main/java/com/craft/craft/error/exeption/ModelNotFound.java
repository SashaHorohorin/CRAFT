package com.craft.craft.error.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
@RequiredArgsConstructor
public class ModelNotFound extends Exception {
    @NonNull
    private String message;
    private HttpStatus status;
}
