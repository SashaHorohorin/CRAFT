package com.craft.craft.dto.info;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class PriceOrdersDto {
    private String username;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private UUID priceId;
    private int curPrice;
    private Date orderTime;
}
