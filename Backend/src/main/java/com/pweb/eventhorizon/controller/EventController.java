package com.pweb.eventhorizon.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pweb.eventhorizon.exception.exceptions.ImageUploadException;
import com.pweb.eventhorizon.model.City;
import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.dto.EventImageDto;
import com.pweb.eventhorizon.model.dto.EventSaveDto;
import com.pweb.eventhorizon.model.entity.EventImage;
import com.pweb.eventhorizon.service.EventImageService;
import com.pweb.eventhorizon.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/app/event")
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final EventImageService eventImageService;
    private final ObjectMapper objectMapper;

    @GetMapping
    public Page<EventDto> getAllEvents(Pageable pageable) {
        return eventService.getAllEvents(pageable);
    }

    @GetMapping("/upcoming")
    public Page<EventDto> getAllUpcomingEvents(Pageable pageable) {
        return eventService.getAllUpcomingEvents(pageable);
    }

    @GetMapping("/{id}")
    public EventDto getEventById(@PathVariable String id) {
        return eventService.getEventById(id);
    }

    @GetMapping("/city/{city}")
    public Page<EventDto> getEventsByCity(@PathVariable @Valid City city, Pageable pageable) {
        return eventService.getEventsByCity(city, pageable);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
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
    @Operation(summary = "Upload an image for a specific event")
    @PostMapping(value = "/{eventId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadImageForEventId(
            @Parameter(description = "Image to be uploaded", required = true) @RequestParam("file") MultipartFile file,
            @PathVariable String eventId
    ) {
        EventImage eventImage = eventImageService.uploadEventImage(eventId, file);
        return ResponseEntity.ok().body("File uploaded successfully: " + eventImage.getFileName());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Upload an event along with images")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EventDto saveEventWithImages(
            @Parameter(description = "Event data", required = true,
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EventSaveDto.class))) @RequestPart String eventDto,
            @Parameter(description = "Files to be uploaded", required = true,
                    content = @Content(mediaType = "image/jpeg", schema = @Schema(type = "string", format = "binary"))) @RequestPart("files") List<MultipartFile> files
    ) {
        try {
            return eventService.saveEventWithImages(objectMapper.readValue(eventDto, EventSaveDto.class), files);
        } catch (JsonProcessingException e) {
            throw new ImageUploadException(e);
        }
    }

    @GetMapping("/{eventId}/images")
    public List<EventImageDto> getEventImages(@PathVariable String eventId) {
        return eventImageService.getEventImages(eventId);
    }
}
