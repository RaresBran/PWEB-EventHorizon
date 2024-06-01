package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.model.City;
import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.dto.EventSaveDto;
import com.pweb.eventhorizon.model.entity.Event;
import com.pweb.eventhorizon.model.entity.Location;
import com.pweb.eventhorizon.repository.EventCategoryRepository;
import com.pweb.eventhorizon.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final EventImageService eventImageService;
    private final EventCategoryRepository eventCategoryRepository;
    private final ModelMapper modelMapper;

    public EventDto getEventById(String id) {
        Event event = eventRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return modelMapper.map(event, EventDto.class);
    }

    public Page<EventDto> getAllEvents(Pageable pageable) {
        Page<Event> events = eventRepository.findAll(pageable);
        return events.map(event -> modelMapper.map(event, EventDto.class));
    }

    public Page<EventDto> getEventsByCity(City city, Pageable pageable) {
        Page<Event> events = eventRepository.findAllByLocations_City(city.name(), pageable);
        return events.map(event -> modelMapper.map(event, EventDto.class));
    }

    public EventDto saveEvent(EventSaveDto eventDto) {
        Event savedEvent = saveEventToRepository(eventDto);
        return modelMapper.map(savedEvent, EventDto.class);
    }

    public Page<EventDto> getAllUpcomingEvents(Pageable pageable) {
        Page<Event> events = eventRepository.findByStartDateAfter(new Date(), pageable);
        return events.map(event -> modelMapper.map(event, EventDto.class));
    }

    public EventDto saveEventWithImages(EventSaveDto eventDto, List<MultipartFile> files) {
        Event savedEvent = saveEventToRepository(eventDto);
        eventImageService.uploadEventImages(savedEvent, files);
        return modelMapper.map(savedEvent, EventDto.class);
    }

    private Event saveEventToRepository(EventSaveDto eventDto) {
        Event event = modelMapper.map(eventDto, Event.class);
        for (Location location : event.getLocations()) {
            location.setEvent(event);
        }
        event.setCategories(
                event
                        .getCategories().stream()
                        .map(eventCategory -> eventCategoryRepository.findById(eventCategory.getId()).orElseThrow(EntityNotFoundException::new))
                        .toList()
        );
        return eventRepository.save(event);
    }

    @Transactional
    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}
