package com.pweb.eventhorizon.model.dto;

import com.pweb.eventhorizon.model.City;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {

    private String id;

    @NotNull(message = "Location city is mandatory")
    @NotEmpty(message = "Location city is mandatory")
    private City city;

    private String streetAddress;

    private String type;
}
