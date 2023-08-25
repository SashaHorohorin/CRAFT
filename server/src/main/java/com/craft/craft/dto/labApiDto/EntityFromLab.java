package com.craft.craft.dto.labApiDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntityFromLab{
    private Rating[] double_rating_history;

    public Integer getNowRating(){
        return double_rating_history[0].getFinal_player_pair_rating();
    }
}