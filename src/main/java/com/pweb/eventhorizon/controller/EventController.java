package com.pweb.eventhorizon.controller;

import com.pweb.eventhorizon.model.City;
import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.dto.EventSaveDto;
import com.pweb.eventhorizon.model.entity.EventImage;
import com.pweb.eventhorizon.service.EventImageService;
import com.pweb.eventhorizon.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/app/event")
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final EventImageService eventImageService;

    @GetMapping
    public List<EventDto> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/upcoming")
    public List<EventDto> getAllUpcomingEvents() {
        return eventService.getAllUpcomingEvents();
    }

    @GetMapping("/{id}")
    public EventDto getEventById(@PathVariable String id) {
        return eventService.getEventById(id);
    }

    @GetMapping("/city/{city}")
    public List<EventDto> getEventsByCity(@PathVariable @Valid City city) {
        return eventService.getEventsByCity(city);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public EventDto saveEvent(@RequestBody @Valid EventSaveDto event) {
        return eventService.saveEvent(event);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().body("Event with id " + id + " deleted successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Upload a photo for a specific event")
    @PostMapping(value = "/{eventId}", consumes = {"multipart/form-data"})
    public ResponseEntity<String> uploadImageForEventId(
            @Parameter(description = "Image to be uploaded", required = true) @RequestParam("file") MultipartFile file,
            @PathVariable String eventId
    ) {
        EventImage eventImage = eventImageService.uploadEventImage(eventId, file);
        return ResponseEntity.ok().body("File uploaded successfully: " + eventImage.getFileName());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = "multipart/form-data")
    public EventDto saveEventWithImages(
            @RequestPart("event") String eventJson,
            @Parameter(description = "Images to be uploaded", required = true) @RequestPart("files") MultipartFile[] files
    ) {
        return eventService.saveEventWithImages(eventJson, files);
    }

    @GetMapping("/{eventId}/images")
    public Set<EventImage> getEventImages(@PathVariable String eventId) {
        return eventImageService.getEventImages(eventId);
    }
}
