package com.pweb.eventhorizon.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum City {
    BUCHAREST("Bucharest"),
    CLUJ_NAPOCA("Cluj-Napoca"),
    BRASOV("Brasov");

    @Getter
    private final String name;
}
