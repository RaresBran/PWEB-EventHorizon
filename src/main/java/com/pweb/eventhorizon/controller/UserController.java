package com.pweb.eventhorizon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app/user")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/test")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello secured");
    }
}
