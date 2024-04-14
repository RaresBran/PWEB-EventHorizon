package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.model.City;
import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.entity.Event;
import com.pweb.eventhorizon.model.entity.Location;
import com.pweb.eventhorizon.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final ModelMapper mapper;

    public EventDto getEventById(String id) {
        Event event = eventRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return mapper.map(event, EventDto.class);
    }

    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(event -> mapper.map(event, EventDto.class))
                .toList();
    }

    public List<EventDto> getEventsByCity(City city) {
        List<Event> events = eventRepository.findAllByLocations_City(city.name());
        return events.stream()
                .map(event -> mapper.map(event, EventDto.class))
                .toList();
    }

    public EventDto saveEvent(EventDto eventDto) {
        Event event = mapper.map(eventDto, Event.class);
        for (Location location : event.getLocations()) {
            location.setEvent(event);
        }
        Event savedEvent = eventRepository.save(event);
        return mapper.map(savedEvent, EventDto.class);
    }

    public List<EventDto> getAllUpcomingEvents() {
        List<Event> events = eventRepository.findByStartDateAfter(new Date());
        return events.stream()
                .map(event -> mapper.map(event, EventDto.class))
                .toList();
    }
}
