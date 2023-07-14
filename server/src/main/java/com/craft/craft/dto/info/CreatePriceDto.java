package com.craft.craft.dto.info;

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
    private String title;
    private int oldPrice;
    @NonNull
    private int nowPrice;
    private String textUnderPrice;
    List<String> services;
}
