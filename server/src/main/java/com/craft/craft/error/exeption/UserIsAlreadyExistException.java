package com.craft.craft.error.exeption;

import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class UserIsAlreadyExistException extends Exception {
    @NonNull
    private String message;
    private HttpStatus status;
}
