package com.craft.craft.error;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class ErrorResponse implements Serializable {
    @NonNull
    private int status;
    @NonNull
    private String message;

    private List<ValidExceptionBody> validExceptions;

    @Override
    public String toString()
    {
        return "ErrorResponse [status=" + status + ", message=" + message + "]";
    }
}