package com.craft.craft.model.sport;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum  TrainType  {
    @JsonProperty("Игровая")
    GAME,
    @JsonProperty("Тактическая игровая")
    TACTIC_GAME,
    @JsonProperty("Тренировка с тренером")
    GAME_WITH_TRAINER,
}
