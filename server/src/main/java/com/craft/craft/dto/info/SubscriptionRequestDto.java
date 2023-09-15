package com.craft.craft.dto.info;

import lombok.Data;

import java.util.UUID;

@Data
public class SubscriptionRequestDto {
    private String username;
    private UUID priceId;
}
