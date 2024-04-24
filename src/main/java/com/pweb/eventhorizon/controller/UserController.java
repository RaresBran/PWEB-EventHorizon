package com.pweb.eventhorizon.controller;

import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.dto.UserDto;
import com.pweb.eventhorizon.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/user")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
public class UserController {

    private final UserService userService;

    @PostMapping("/events/{eventId}")
    public UserDto addEventToUserList(Authentication authentication, @PathVariable String eventId) {
        return userService.addEventToList(authentication, eventId);
    }

    @DeleteMapping("/events/{eventId}")
    public UserDto removeEventFromUserList(Authentication authentication, @PathVariable String eventId) {
        return userService.removeEventFromUserList(authentication, eventId);
    }

    @GetMapping()
    public UserDto getCurrentUser(Authentication authentication) {
        return userService.getCurrentUser(authentication);
    }

    @GetMapping("/events")
    public List<EventDto> getCurrentUserEventList(Authentication authentication) {
        return userService.getCurrentUserEventList(authentication);
    }
}
