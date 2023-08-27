package com.craft.craft.service.mail;

import com.craft.craft.dto.labApiDto.EntityFromLab;
import com.craft.craft.error.exeption.ModelNotFoundException;
import org.springframework.web.client.RestTemplate;

public class LabService {
   private static RestTemplate restTemplate = new RestTemplate();
   public static int getUserRating(Integer labID) throws ModelNotFoundException {
        EntityFromLab entity = restTemplate.getForEntity("https://badminton77.ru/api/other_user_rating_history/?playerRatingID="+labID, EntityFromLab.class).getBody();
        if(entity == null) throw new ModelNotFoundException("По данному id нет аккаунта в ЛАБ");
        return entity.getNowRating();
    }
}
