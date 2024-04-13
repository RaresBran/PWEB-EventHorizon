package com.pweb.eventhorizon.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

public enum BusinessErrorCodes {

    NO_CODE(0, NOT_IMPLEMENTED, "No code"),
    INCORRECT_CURRENT_PASSWORD(300, BAD_REQUEST, "Current password is incorrect"),
    BAD_CREDENTIALS(403, FORBIDDEN, "Login and / or password is incorrect"),
    LOGOUT_EXCEPTION(300, BAD_REQUEST, "Token passed is invalid")
    ;

    @Getter
    private final int code;

    @Getter
    private final String description;

    @Getter
    private final HttpStatus httpStatusCode;

    BusinessErrorCodes(int code, HttpStatus httpStatusCode, String description) {
        this.code = code;
        this.description = description;
        this.httpStatusCode = httpStatusCode;
    }
}
