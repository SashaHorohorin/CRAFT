package com.craft.craft.controller.info;

import com.craft.craft.dto.info.CreatePriceDto;
import com.craft.craft.dto.info.PriceResponseDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.info.PriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/price")
@RequiredArgsConstructor
public class PriceController {
    private final PriceService priceService;

    @GetMapping("/all")
    public List<PriceResponseDto> getAll(){
        return priceService.findAll().stream().map(PriceResponseDto::getDtoFromPrice).collect(Collectors.toList());
    }
    @GetMapping("/get-by-sportcomplex/{sportComplex}")
    public List<PriceResponseDto> getAllBySportComplex(@PathVariable String sportComplex) throws ModelNotFoundException {
        return priceService.getAllBySportComplex(sportComplex).stream().map(PriceResponseDto::getDtoFromPrice).collect(Collectors.toList());
    }

    @GetMapping("/get-all-active-prices")
    public List<PriceResponseDto> getAllActivePrices() throws ModelNotFoundException {
        return priceService.getAllActivePrices().stream().map(PriceResponseDto::getDtoFromPrice).collect(Collectors.toList());
    }

    @PostMapping("/create")
    public PriceResponseDto createPrice(@RequestBody CreatePriceDto priceDto){
        System.out.println(priceDto.getSportComplex());
        return PriceResponseDto.getDtoFromPrice(priceService.create(priceDto));
    }
    @DeleteMapping("/delete/{id}")
    public boolean deletePrice(@PathVariable UUID id){
        return priceService.delete(id);
    }

    @PostMapping("/update/{id}")
    public PriceResponseDto updatePrice(@PathVariable UUID id, CreatePriceDto priceDto) throws ModelNotFoundException {
        return PriceResponseDto.getDtoFromPrice(priceService.update(id, priceDto));
    }

    @GetMapping("/activate/{priceId}")
    public PriceResponseDto activate(@PathVariable UUID priceId) throws ModelNotFoundException {
        return PriceResponseDto.getDtoFromPrice(priceService.activate(priceId));
    }

    @GetMapping("/inactivate/{priceId}")
    public PriceResponseDto inactivate(@PathVariable UUID priceId) throws ModelNotFoundException {
        return PriceResponseDto.getDtoFromPrice(priceService.inactivate(priceId));
    }
}
