package com.craft.craft.model.sport;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum  TrainType  {
    @JsonProperty("Игровая")
    GAME,
    @JsonProperty("Игровая с тренером")
    GAME_WITH_TRAINER,
    @JsonProperty("Тренировка для начинающих и продолжающих")
    TRAIN_FOR_LOW_SKILL,
}
