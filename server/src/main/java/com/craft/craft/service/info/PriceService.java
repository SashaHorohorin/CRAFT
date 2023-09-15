package com.craft.craft.service.info;

import com.craft.craft.dto.info.CreatePriceDto;
import com.craft.craft.dto.info.PriceResponseDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.info.Price;
import com.craft.craft.model.sport.Competition;
import com.craft.craft.model.sport.CompetitionStatus;
import com.craft.craft.model.sport.SportComplex;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.repository.info.PriceRepo;
import com.craft.craft.repository.user.BaseUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PriceService {

    private final PriceRepo priceRepo;
    private final BaseUserRepo userRepo;

    public Price create(CreatePriceDto priceDto){
        Price price = new Price(
                priceDto.getTitle(),
                priceDto.getNowPrice()
        );
        price.setOldPrice(priceDto.getOldPrice());
        price.setTextUnderPrice(priceDto.getTextUnderPrice());
        price.getServices().addAll(priceDto.getServices());
        price.setSportComplex(priceDto.getSportComplex());
        price.setActive(true);
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
        price.setMaxTrains(priceDto.getTitle());
        price.setOldPrice(priceDto.getOldPrice());
        price.setNowPrice(priceDto.getNowPrice());
        price.setTextUnderPrice(priceDto.getTextUnderPrice());
        price.setServices(priceDto.getServices());
        price.setSportComplex(priceDto.getSportComplex());
        return price;
    }

    public List<Price> getAllBySportComplex(String sportComplex) throws ModelNotFoundException {
        return priceRepo.findAllBySportComplex(SportComplex.valueOf(sportComplex)).orElseThrow(
                ()->new ModelNotFoundException("Нет такого спортивного комплекса"));
    }

    public List<Price> getAllActivePrices() throws ModelNotFoundException {
        return priceRepo.findAllByActiveTrue().orElseThrow(
                ()->new ModelNotFoundException("Нет активных цен"));
    }

    public Price activate(UUID priceId) throws ModelNotFoundException {
        Price price = priceRepo.findById(priceId).orElseThrow(
                ()->new ModelNotFoundException("Нет цены с таким id")
        );
        price.setActive(true);
        return priceRepo.save(price);
    }
    public Price inactivate(UUID priceId) throws ModelNotFoundException {
        Price price = priceRepo.findById(priceId).orElseThrow(
                ()->new ModelNotFoundException("Нет цены с таким id")
        );
        price.setActive(false);
        return priceRepo.save(price);
    }


}
