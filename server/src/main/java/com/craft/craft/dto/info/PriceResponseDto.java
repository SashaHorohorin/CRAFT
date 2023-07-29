package com.craft.craft.dto.info;

import com.craft.craft.model.info.Price;
import com.craft.craft.model.sport.SportComplex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceResponseDto {
    private String title;
    private int oldPrice;
    private int nowPrice;
    private int discount;
    private SportComplex sportComplex;
    private String textUnderPrice;
    List<String> services;

    public static PriceResponseDto getDtoFromPrice(Price price){
        return new PriceResponseDto(
                price.getTitle(),
                price.getOldPrice(),
                price.getNowPrice(),
                price.getDiscount(),
                price.getSportComplex(),
                price.getTextUnderPrice(),
                price.getServices()
        );
    }
}
