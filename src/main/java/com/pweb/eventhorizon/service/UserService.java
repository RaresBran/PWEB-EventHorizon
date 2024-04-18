package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.dto.UserDto;
import com.pweb.eventhorizon.model.entity.Event;
import com.pweb.eventhorizon.model.entity.User;
import com.pweb.eventhorizon.repository.EventRepository;
import com.pweb.eventhorizon.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final ModelMapper mapper;

    public UserDto addEventToList(String userId, String eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(EntityNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);

        user.getEvents().add(event);
        userRepository.save(user);

        return mapper.map(user, UserDto.class);
    }

    public UserDto getUserById(String userId) {
        User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        return mapper.map(user, UserDto.class);
    }

    public List<EventDto> getUserEventListById(String userId) {
        User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        return user.getEvents().stream()
                .map(event -> mapper.map(event, EventDto.class))
                .toList();
    }

    public UserDto getUserByEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(EntityNotFoundException::new);
        return mapper.map(user, UserDto.class);
    }

    public UserDto deleteEventFromUserList(String userId, String eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(EntityNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);

        user.getEvents().remove(event);
        userRepository.save(user);

        return mapper.map(user, UserDto.class);
    }
}
