package com.craft.craft.controller.info;

import com.craft.craft.dto.info.PriceOrdersDto;
import com.craft.craft.dto.info.SubscriptionRequestDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.info.Price;
import com.craft.craft.model.info.PriceUser;
import com.craft.craft.service.info.PriceUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/subscription")
@RequiredArgsConstructor
public class PriceUserController {

    private final PriceUserService priceUserService;

    @PostMapping("/add-order")
    public void addOrder(@RequestBody SubscriptionRequestDto dto) throws ModelNotFoundException {
       priceUserService.addOrder(dto.getUsername(), dto.getPriceId());
    }

    @PostMapping("/accept-order")
    public void acceptOrder(@RequestBody SubscriptionRequestDto dto) throws ModelNotFoundException {
        priceUserService.acceptOrder(dto.getUsername(), dto.getPriceId());
    }

    @PostMapping("/cancel-order")
    public void cancelOrder(@RequestBody SubscriptionRequestDto dto) throws ModelNotFoundException {
        priceUserService.cancelOrder(dto.getUsername(), dto.getPriceId());
    }
//    @GetMapping
//    public List<PriceUser> getAll(){
//       return priceUserService.findAll();
//    }
    @GetMapping("/all-orders")
    public List<PriceOrdersDto> getAllOrders(){
        return priceUserService.getAllOrders();
    }
//    @GetMapping("/delete/{id}")
//    public void delete(@PathVariable UUID id){
//        priceUserService.delete(id);
//    }
}
