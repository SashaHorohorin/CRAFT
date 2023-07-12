package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddUserToTrainRequestDto {
    private UUID trainId;
    private String username;
}
