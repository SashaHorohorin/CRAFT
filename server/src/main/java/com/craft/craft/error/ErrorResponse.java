package com.craft.craft.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse implements Serializable {

    private int status;
    private String message;

    @Override
    public String toString()
    {
        return "ErrorResponse [status=" + status + ", message=" + message + "]";
    }
}