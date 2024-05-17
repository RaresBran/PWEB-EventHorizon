package com.pweb.eventhorizon.controller;

import com.pweb.eventhorizon.model.dto.CommentDto;
import com.pweb.eventhorizon.model.dto.CommentSaveDto;
import com.pweb.eventhorizon.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app/comment")
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{eventId}")
    public Page<CommentDto> getCommentsByEventId(@PathVariable String eventId, Authentication authentication, Pageable pageable) {
        return commentService.getCommentsByEventId(eventId, authentication, pageable);
    }

    @PostMapping
    public CommentDto saveComment(@RequestBody @Valid CommentSaveDto commentDto, Authentication authentication) {
        return commentService.saveComment(commentDto, authentication);
    }

    @DeleteMapping("/{id}")
    public CommentDto deleteCommentById(@PathVariable String id, Authentication authentication) {
        return commentService.deleteCommentById(id, authentication);
    }
}
