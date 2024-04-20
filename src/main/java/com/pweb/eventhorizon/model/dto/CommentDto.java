package com.pweb.eventhorizon.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

    private String id;

    private UserDto user;

    private EventDto event;

    private String content;

    private Date commentDate;
}
