package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.exception.exceptions.ImageUploadException;
import com.pweb.eventhorizon.model.entity.Event;
import com.pweb.eventhorizon.model.entity.EventImage;
import com.pweb.eventhorizon.repository.EventImageRepository;
import com.pweb.eventhorizon.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class EventImageService {

    private final EventRepository eventRepository;
    private final EventImageRepository eventImageRepository;

    public EventImage uploadEventImage(String eventId, MultipartFile file) {
        Event event = eventRepository.findById(eventId).orElseThrow(EntityNotFoundException::new);

        EventImage eventImage = saveEventImage(event, file);
        event.getImages().add(eventImage);
        eventRepository.save(event);

        return eventImage;
    }

    public Set<EventImage> uploadEventImages(Event event, MultipartFile[] files) {
        Set<EventImage> images = new HashSet<>();
        for (MultipartFile file : files) {
            EventImage eventImage = saveEventImage(event, file);
            images.add(eventImage);
            event.getImages().add(eventImage);
        }
        eventRepository.save(event);
        return images;
    }

    @Transactional(readOnly = true)
    public Set<EventImage> getEventImages(String eventId) {
        return eventImageRepository.findByEventId(eventId);
    }

    private EventImage saveEventImage(Event event, MultipartFile file) {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        try {
            EventImage eventImage = EventImage.builder()
                    .fileName(fileName)
                    .event(event)
                    .imageData(file.getBytes())
                    .uploadDate(new Date())
                    .build();
            return eventImageRepository.save(eventImage);

        } catch (IOException e) {
            throw new ImageUploadException(e);
        }
    }
}
