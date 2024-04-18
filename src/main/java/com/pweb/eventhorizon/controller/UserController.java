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
    public UserDto addEventToUserList(@PathVariable String userId, @PathVariable String eventId) {
        return userService.addEventToList(userId, eventId);
    }

    @DeleteMapping("/{userId}/{eventId}")
    public UserDto deleteEventFromUserList(@PathVariable String userId, @PathVariable String eventId) {
        return userService.deleteEventFromUserList(userId, eventId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{userId}")
    public UserDto getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/email/{userEmail}")
    public UserDto getUserByEmail(@PathVariable String userEmail) {
        return userService.getUserByEmail(userEmail);
    }

    @GetMapping("/{userId}/events")
    public List<EventDto> getUserEventListById(@PathVariable String userId) {
        return userService.getUserEventListById(userId);
    }
}
