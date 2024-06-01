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
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public CommentDto saveComment(CommentSaveDto commentDto, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(EntityNotFoundException::new);
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

        CommentDto returnedCommentDto = modelMapper.map(comment, CommentDto.class);
        returnedCommentDto.setCanDelete(comment.getUser().getId().equals(user.getId()));
        return  returnedCommentDto;
    }

    @Transactional
    public CommentDto deleteCommentById(String id, Authentication authentication) {
        Comment comment = commentRepository.findById(id).orElseThrow(EntityNotFoundException::new);

        if (!comment.getUser().getEmail().equals(authentication.getName())) {
            throw new AccessDeniedException("Not authorized to delete this comment");
        }

        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(EntityNotFoundException::new);
        Event event = eventRepository.findById(comment.getEvent().getId()).orElseThrow(EntityNotFoundException::new);

        user.getComments().remove(comment);
        event.getComments().remove(comment);
        commentRepository.deleteById(id);

        return modelMapper.map(comment, CommentDto.class);
    }

    public Page<CommentDto> getCommentsByEventId(String eventId, Authentication authentication, Pageable pageable) {
        eventRepository.findById(eventId).orElseThrow(EntityNotFoundException::new);
        Page<Comment> comments = commentRepository.findAllByEventId(eventId, pageable);

        return comments.map(comment -> {
                    CommentDto commentDto = modelMapper.map(comment, CommentDto.class);
                    commentDto.setCanDelete(comment.getUser().getEmail().equals(authentication.getName()));
                    return commentDto;
                });
    }
}
