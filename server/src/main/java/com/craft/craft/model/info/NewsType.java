package com.craft.craft.model.info;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum  NewsType {
    @JsonProperty("Новости")
    BASE_NEWS,
    @JsonProperty("Предстоящие соревнования")
    START_COMPETITION,
    @JsonProperty("Результаты соревнований")
    END_COMPETITION
}
