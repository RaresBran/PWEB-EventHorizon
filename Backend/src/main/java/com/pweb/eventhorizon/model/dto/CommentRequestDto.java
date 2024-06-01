package com.pweb.eventhorizon.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDto {

    @NotNull(message = "Content field is mandatory")
    @NotEmpty(message = "Content field is mandatory")
    private String content;

    private Date commentDate;
}
