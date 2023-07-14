package com.craft.craft.service.info;

import com.craft.craft.dto.info.CreatePriceDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.info.Price;
import com.craft.craft.repository.info.PriceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PriceService {

    private final PriceRepo priceRepo;

    public Price create(CreatePriceDto priceDto){
        Price price = new Price(
                priceDto.getTitle(),
                priceDto.getNowPrice()
        );
        price.setOldPrice(priceDto.getOldPrice());
        price.setTextUnderPrice(priceDto.getTextUnderPrice());
        price.getServices().addAll(priceDto.getServices());
       return priceRepo.save(price);
    }

    public List<Price> findAll(){
        return priceRepo.findAll();
    }

    public boolean delete(UUID id){
        priceRepo.deleteById(id);
        return true;
    }

    public Price update(UUID id, CreatePriceDto priceDto) throws ModelNotFoundException {
        Price price = priceRepo.findById(id).orElseThrow(()->new ModelNotFoundException("По данному id цена не найдена"));
        price.setTitle(priceDto.getTitle());
        price.setOldPrice(priceDto.getOldPrice());
        price.setNowPrice(priceDto.getNowPrice());
        price.setTextUnderPrice(priceDto.getTextUnderPrice());
        price.setServices(priceDto.getServices());
        return price;
    }
}
