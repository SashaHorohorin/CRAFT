package com.craft.craft.dto.info;

import com.craft.craft.model.sport.SportComplex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePriceDto {
    @NonNull
    private int title;
    private int oldPrice;
    @NonNull
    private int nowPrice;
    private String textUnderPrice;
    private SportComplex sportComplex;
    List<String> services;
}
