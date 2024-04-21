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
public class CommentSaveDto {

    private String userId;

    private String eventId;

    private String content;

    private Date commentDate;
}
