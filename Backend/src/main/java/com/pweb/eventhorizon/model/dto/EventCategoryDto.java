package com.pweb.eventhorizon.model.dto;

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
public class EventCategoryDto {
    private String id;

    @NotNull(message = "Category name is mandatory")
    @NotEmpty(message = "Category name is mandatory")
    private String name;

    private String description;
}
