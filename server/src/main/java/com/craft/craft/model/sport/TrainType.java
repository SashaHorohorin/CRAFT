package com.craft.craft.model.sport;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum  TrainType  {
    @JsonProperty("Игровая")
    GAME,
    @JsonProperty("Тактическая игровая")
    TACTIC_GAME,
    @JsonProperty("Тренировка с тренером")
    GAME_WITH_TRAINER,
    @JsonProperty("Детская тренировка")
    BABY_TRAIN,
    @JsonProperty("Тренировка для начинающих")
    GAME_FOR_BEGINERS,
    @JsonProperty("Тренировка для продолжающих")
    GAME_FOR_CONTINUES,

    @JsonProperty("Тренировки для начинающих и продолжающих")
    GAME_FOR_BEG_AND_CONT,

    @JsonProperty("Мастер+")
    GAME_FOR_MASTER
}
