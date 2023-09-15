package com.craft.craft.dto.info;

import com.craft.craft.model.info.Price;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class SubscriptionResponseDto {
    private String username;
    private UUID priceId;

}
