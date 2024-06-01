package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.model.dto.EventDto;
import com.pweb.eventhorizon.model.dto.UserDto;
import com.pweb.eventhorizon.model.entity.Event;
import com.pweb.eventhorizon.model.entity.User;
import com.pweb.eventhorizon.repository.EventRepository;
import com.pweb.eventhorizon.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final ModelMapper mapper;

    @Transactional
    public UserDto addEventToList(Authentication authentication, String eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(EntityNotFoundException::new);
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(EntityNotFoundException::new);

        user.getEvents().add(event);
        user = userRepository.save(user);

        return mapper.map(user, UserDto.class);
    }

    public UserDto getCurrentUser(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(EntityNotFoundException::new);
        return mapper.map(user, UserDto.class);
    }

    public List<EventDto> getCurrentUserEventList(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(EntityNotFoundException::new);
        return user.getEvents().stream()
                .map(event -> mapper.map(event, EventDto.class))
                .toList();
    }

    public UserDto removeEventFromUserList(Authentication authentication, String eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(EntityNotFoundException::new);
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(EntityNotFoundException::new);

        user.getEvents().removeIf(e -> e.getId().equals(event.getId()));
        user = userRepository.save(user);

        return mapper.map(user, UserDto.class);
    }
}
