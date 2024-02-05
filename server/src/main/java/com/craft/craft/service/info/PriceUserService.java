package com.craft.craft.service.info;

import com.craft.craft.dto.info.PriceOrdersDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.info.Price;
import com.craft.craft.model.info.PriceUser;
import com.craft.craft.model.user.BaseUser;
import com.craft.craft.repository.info.PriceRepo;
import com.craft.craft.repository.info.PriceUserRepo;
import com.craft.craft.repository.user.BaseUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PriceUserService {
    private final PriceUserRepo priceUserRepo;
    private final BaseUserRepo userRepo;
    private final PriceRepo priceRepo;

        public Price addOrder(String username, UUID priceID) throws ModelNotFoundException {
        BaseUser user = userRepo.findByUsername(username).orElseThrow(()-> new ModelNotFoundException("Пользователь не найден"));
        if(user.getPrice() != null) throw new ModelNotFoundException("Вы не можете купить новый абонемент пока не истек срок текущего");
        Price price = priceRepo.findById(priceID).orElseThrow(()-> new ModelNotFoundException("Цена не найдена"));
        price.getUserOrders().add(user);
        return priceRepo.save(price);
    }

    public PriceUser acceptOrder(String username, UUID priceID) throws ModelNotFoundException {
        BaseUser user = userRepo.findByUsername(username).orElseThrow(()-> new ModelNotFoundException("Пользователь не найден"));
        Price price = priceRepo.findById(priceID).orElseThrow(()-> new ModelNotFoundException("Цена не найдена"));
        if(price.getUserOrders().contains(user))
            price.getUserOrders().remove(user);
        else throw new ModelNotFoundException("У данного пользователя не было заявки на покупку абонемента");
        priceRepo.save(price);
        PriceUser priceUser = new PriceUser(price, user, new Date(), price.getMaxTrains(),price.getMaxTrains());
        user.setPrice(priceUser);
        return priceUserRepo.save(priceUser);
    }


    public void cancelOrder(String username, UUID priceID) throws ModelNotFoundException {
        BaseUser user = userRepo.findByUsername(username).orElseThrow(()-> new ModelNotFoundException("Пользователь не найден"));
        Price price = priceRepo.findById(priceID).orElseThrow(()-> new ModelNotFoundException("Цена не найдена"));
        if(price.getUserOrders().contains(user))
            price.getUserOrders().remove(user);
        else throw new ModelNotFoundException("У данного пользователя не было заявки на покупку абонемента");
        priceRepo.save(price);
    }

    public List<PriceOrdersDto> getAllOrders(){
        List<Price> prices = priceRepo.findAll();
        List<PriceOrdersDto> orders = new ArrayList<>();
        prices.forEach(price -> {
            price.getUserOrders().forEach(u -> orders.add(
                    PriceOrdersDto.builder()
                            .username(u.getUsername())
                            .email(u.getEmail())
                            .firstName(u.getFirstName())
                            .lastName(u.getLastName())
                            .phone(u.getPhoneNumber())
                            .priceId(price.getId())
                            .orderTime(new Date())
                            .curPrice(price.getNowPrice())
                        .build()
            ));
        });
        return orders;
    }

    public List<PriceUser> findAll(){
        return priceUserRepo.findAll();
    }

    public void delete(UUID uuid){
        PriceUser priceUser = priceUserRepo.getReferenceById(uuid);
        priceUserRepo.delete(priceUser);
    }


//    @Async
//    @Scheduled(fixedDelay = 24*1000 * 60 * 60)//каждый день
//    public void updatePrices() {
//        List<PriceUser> prices = priceUserRepo.findAll();
//        Date date = new Date();
//        prices.forEach(price -> {
//            // (время покупки) ДО (текущая дата - 45дней) -> обнуляем абонемент
//            if(price.getTimeOfPurchase().toInstant().isBefore(date.toInstant().minus(45, ChronoUnit.DAYS))){
//                price.getUser().setPrice(null);
//                userRepo.save(price.getUser());
//                priceUserRepo.deleteById(price.getId());
//            }
//        });
//    }

    @Async
    @Scheduled(fixedDelay = 24*1000 * 60 * 60)//каждый день
    public void updateCompetitionStatus() {
        List<PriceUser> prices = priceUserRepo.findAll();
        Date startDay = Date.from(new Date().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate().atStartOfDay(ZoneId.systemDefault()).toInstant()
        );
        Date date = Date.from(startDay.toInstant().plus(1, ChronoUnit.DAYS));
        prices.forEach(price -> {
            if(price.getTimeOfPurchase().toInstant().isAfter(date.toInstant().plus(45, ChronoUnit.DAYS))){
                priceUserRepo.delete(price);
            }
        });
    }

}
