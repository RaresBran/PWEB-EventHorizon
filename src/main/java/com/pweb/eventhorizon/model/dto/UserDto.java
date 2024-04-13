package com.pweb.eventhorizon.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    @NotEmpty
    @NotBlank
    private String firstName;

    @NotEmpty
    @NotBlank
    private String lastName;

    @NotEmpty
    @NotBlank
    @Email
    private String email;

    @NotEmpty
    @NotBlank
    private String password;
}
