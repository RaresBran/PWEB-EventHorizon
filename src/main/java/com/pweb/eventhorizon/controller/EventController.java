package com.pweb.eventhorizon.controller;

import com.pweb.eventhorizon.model.City;
import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/event")
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;


    @GetMapping
    public List<EventDto> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public EventDto getEventById(@PathVariable String id) {
        return eventService.getEventById(id);
    }

    @GetMapping("/city/{city}")
    public List<EventDto> getEventsByCity(@PathVariable @Valid City city) {
        return eventService.getEventsByCity(city);
    }

    @PostMapping
    public EventDto saveEvent(@RequestBody @Valid EventDto event) {
        return eventService.saveEvent(event);
    }
}
