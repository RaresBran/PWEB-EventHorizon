package com.pweb.eventhorizon.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {

    private String id;

    @NotNull(message = "Event name is mandatory")
    @NotEmpty(message = "Event name is mandatory")
    private String name;

    private Date startDate;

    private Date endDate;

    private String information;

    private String link;

    private List<EventCategoryDto> categories;

    @NotNull(message = "Event must have at least one location")
    @NotEmpty(message = "Event must have at least one location")
    private List<LocationDto> locations;

    private List<CommentDto> comments;

    private List<EventImageDto> images;
}
