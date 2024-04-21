package com.pweb.eventhorizon.exception;

import com.pweb.eventhorizon.exception.exceptions.LogoutException;
import com.pweb.eventhorizon.exception.exceptions.ImageUploadException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;
import java.util.Set;

import static com.pweb.eventhorizon.exception.BusinessErrorCodes.*;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<ExceptionResponse> handleException(DataIntegrityViolationException exp) {
        return ResponseEntity
                .status(INVALID_DATA_FORMAT.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(INVALID_DATA_FORMAT.getCode())
                                .businessErrorDescription(INVALID_DATA_FORMAT.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(ImageUploadException.class)
    public ResponseEntity<ExceptionResponse> handleException(ImageUploadException exp) {
        return ResponseEntity
                .status(IMAGE_UPLOAD_EXCEPTION.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(IMAGE_UPLOAD_EXCEPTION.getCode())
                                .businessErrorDescription(IMAGE_UPLOAD_EXCEPTION.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(LogoutException.class)
    public ResponseEntity<ExceptionResponse> handleException(LogoutException exp) {
        return ResponseEntity
                .status(LOGOUT_EXCEPTION.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(LOGOUT_EXCEPTION.getCode())
                                .businessErrorDescription(LOGOUT_EXCEPTION.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleException(EntityNotFoundException exp) {
        return ResponseEntity
                .status(ENTITY_NOT_FOUND.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ENTITY_NOT_FOUND.getCode())
                                .businessErrorDescription(ENTITY_NOT_FOUND.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException exp) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BAD_CREDENTIALS.getCode())
                                .businessErrorDescription(BAD_CREDENTIALS.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException exp) {
        Set<String> errors = new HashSet<>();
        exp.getBindingResult().getAllErrors()
                .forEach(error -> {
                    var errorMessage = error.getDefaultMessage();
                    errors.add(errorMessage);
                });
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .validationErrors(errors)
                                .build()
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exp) {
        //log the exception
        exp.printStackTrace();
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorDescription("Internal error!")
                                .error(exp.getMessage())
                                .build()
                );
    }
}
