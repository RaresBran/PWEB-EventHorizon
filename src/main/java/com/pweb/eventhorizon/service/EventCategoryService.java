package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.model.dto.EventCategoryDto;
import com.pweb.eventhorizon.repository.EventCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventCategoryService {

    private final EventCategoryRepository eventCategoryRepository;
    private final ModelMapper modelMapper;

    public List<EventCategoryDto> getAllEventCategories() {
        return eventCategoryRepository
                .findAll().stream()
                .map(eventCategory -> modelMapper.map(eventCategory, EventCategoryDto.class))
                .toList();
    }
}
