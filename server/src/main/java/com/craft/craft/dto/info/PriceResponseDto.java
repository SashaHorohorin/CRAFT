package com.craft.craft.dto.info;

import com.craft.craft.model.info.Price;
import com.craft.craft.model.info.PriceType;
import com.craft.craft.model.sport.SportComplex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceResponseDto {
    private UUID id;
    private int title;
    private int oldPrice;
    private int nowPrice;
    private int discount;
    private SportComplex sportComplex;
    private String textUnderPrice;
    private PriceType type;
    List<String> services;

    public static PriceResponseDto getDtoFromPrice(Price price){
        return new PriceResponseDto(
                price.getId(),
                price.getMaxTrains(),
                price.getOldPrice(),
                price.getNowPrice(),
                price.getDiscount(),
                price.getSportComplex(),
                price.getTextUnderPrice(),
                price.getType(),
                price.getServices()
        );
    }
}
