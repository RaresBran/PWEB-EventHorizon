package com.pweb.eventhorizon.model.dto;

import jakarta.validation.constraints.Email;
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
public class FeedbackDto {

    @NotNull(message = "Email field is mandatory")
    @NotEmpty(message = "Email field is mandatory")
    @Email(message = "Must be a valid email address")
    private String email;

    @NotNull(message = "Feedback type field is mandatory")
    @NotEmpty(message = "Feedback type field is mandatory")
    private String feedbackType;

    @NotNull(message = "Satisfaction field is mandatory")
    @NotEmpty(message = "Satisfaction field is mandatory")
    private String satisfaction;

    @NotNull(message = "Consent field is mandatory")
    private boolean contactConsent;

    private String comments;
}
