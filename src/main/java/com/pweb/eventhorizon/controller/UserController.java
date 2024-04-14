package com.pweb.eventhorizon.controller;

import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.dto.UserDto;
import com.pweb.eventhorizon.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/user")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
public class UserController {

    private final UserService userService;

    @PostMapping("/{userId}/{eventId}")
    public UserDto addEventToList(@PathVariable String userId, @PathVariable String eventId) {
        return userService.addEventToList(userId, eventId);
    }

    @GetMapping("/{userId}")
    public UserDto getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/{userEmail}")
    public UserDto getUserByEmail(@PathVariable String userEmail) {
        return userService.getUserByEmail(userEmail);
    }

    @GetMapping("/{userId}")
    public List<EventDto> getUserEventListById(@PathVariable String userId) {
        return userService.getUserEventListById(userId);
    }
}
