package com.pweb.eventhorizon.controller;

import com.pweb.eventhorizon.model.dto.EventCategoryDto;
import com.pweb.eventhorizon.service.EventCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/app/event-category")
@RequiredArgsConstructor
public class EventCategoryController {

    private final EventCategoryService eventCategoryService;

    @GetMapping
    public List<EventCategoryDto> getAllEventCategories() {
        return eventCategoryService.getAllEventCategories();
    }
}
