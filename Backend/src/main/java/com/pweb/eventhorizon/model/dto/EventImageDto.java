package com.pweb.eventhorizon.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventImageDto {

    private String id;

    @JsonIgnore
    private EventDto event;

    private String fileName;

    private Date uploadDate;

    private byte[] imageData;
}
