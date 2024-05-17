package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.model.dto.FeedbackDto;
import com.pweb.eventhorizon.model.entity.Feedback;
import com.pweb.eventhorizon.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ModelMapper modelMapper;

    public FeedbackDto saveFeedback(FeedbackDto feedbackDto) {
        Feedback feedback = modelMapper.map(feedbackDto, Feedback.class);
        feedbackRepository.save(feedback);
        return feedbackDto;
    }
}
