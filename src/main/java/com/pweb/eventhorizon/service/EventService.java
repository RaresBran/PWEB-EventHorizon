package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.model.City;
import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.dto.EventSaveDto;
import com.pweb.eventhorizon.model.entity.Event;
import com.pweb.eventhorizon.model.entity.Location;
import com.pweb.eventhorizon.repository.EventCategoryRepository;
import com.pweb.eventhorizon.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EventService {

    private final EventRepository eventRepository;
    private final EventImageService eventImageService;
    private final EventCategoryRepository eventCategoryRepository;
    private final ModelMapper modelMapper;

    public EventDto getEventById(String id) {
        Event event = eventRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return modelMapper.map(event, EventDto.class);
    }

    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(event -> modelMapper.map(event, EventDto.class))
                .toList();
    }

    public List<EventDto> getEventsByCity(City city) {
        List<Event> events = eventRepository.findAllByLocations_City(city.name());
        return events.stream()
                .map(event -> modelMapper.map(event, EventDto.class))
                .toList();
    }

    public EventDto saveEvent(EventSaveDto eventDto) {
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
        Event savedEvent = eventRepository.save(event);
        return modelMapper.map(savedEvent, EventDto.class);
    }

    public List<EventDto> getAllUpcomingEvents() {
        List<Event> events = eventRepository.findByStartDateAfter(new Date());
        return events.stream()
                .map(event -> modelMapper.map(event, EventDto.class))
                .toList();
    }

    public EventDto saveEventWithImages(EventSaveDto event, List<MultipartFile> files) {
        Event savedEvent = eventRepository.save(modelMapper.map(event, Event.class));
        eventImageService.uploadEventImages(savedEvent, files);
        return modelMapper.map(savedEvent, EventDto.class);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}
