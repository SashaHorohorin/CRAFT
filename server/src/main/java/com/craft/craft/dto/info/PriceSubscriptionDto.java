package com.craft.craft.dto.info;

import com.craft.craft.model.info.PriceUser;
import lombok.Builder;
import lombok.Data;

import java.time.temporal.ChronoUnit;
import java.util.Date;

@Data
@Builder
public class PriceSubscriptionDto {
    private int remainingTrains;
    private int maxTrains;
    private Date startSubscription;
    private Date endSubscription;

    public static PriceSubscriptionDto getDtoFromPriceUser(PriceUser priceUser){
        if(priceUser == null) return null;
        return PriceSubscriptionDto.builder()
                .remainingTrains(priceUser.getRemainingTrains())
                .maxTrains(priceUser.getMaxTrains())
                .startSubscription(priceUser.getTimeOfPurchase())
                .endSubscription(Date.from(priceUser.getTimeOfPurchase().toInstant().plus(45, ChronoUnit.DAYS)))
                .build();
    }
}
