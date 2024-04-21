package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.model.dto.CommentDto;
import com.pweb.eventhorizon.model.dto.CommentSaveDto;
import com.pweb.eventhorizon.model.entity.Comment;
import com.pweb.eventhorizon.model.entity.Event;
import com.pweb.eventhorizon.model.entity.User;
import com.pweb.eventhorizon.repository.CommentRepository;
import com.pweb.eventhorizon.repository.EventRepository;
import com.pweb.eventhorizon.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public CommentDto saveComment(CommentSaveDto commentDto) {
        User user = userRepository.findById(commentDto.getUserId()).orElseThrow(EntityNotFoundException::new);
        Event event = eventRepository.findById(commentDto.getEventId()).orElseThrow(EntityNotFoundException::new);
        Comment comment = Comment.builder()
                .content(commentDto.getContent())
                .commentDate(commentDto.getCommentDate())
                .user(user)
                .event(event)
                .build();
        comment = commentRepository.save(comment);

        user.getComments().add(comment);
        userRepository.save(user);
        event.getComments().add(comment);
        eventRepository.save(event);

        return modelMapper.map(comment, CommentDto.class);
    }

    public CommentDto deleteCommentById(String id) {
        Comment comment = commentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        commentRepository.deleteById(id);
        return modelMapper.map(comment, CommentDto.class);
    }
}
