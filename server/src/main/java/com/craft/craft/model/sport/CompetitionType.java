package com.craft.craft.model.sport;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CompetitionType {
    @JsonProperty("Пара")
    PAIR,
    @JsonProperty("Микст")
    TWO,
    @JsonProperty("Все против всех")
    THREE
}
