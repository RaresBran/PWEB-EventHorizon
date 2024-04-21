package com.pweb.eventhorizon.controller;

import com.pweb.eventhorizon.model.dto.CommentDto;
import com.pweb.eventhorizon.model.dto.CommentSaveDto;
import com.pweb.eventhorizon.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app/comment")
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public CommentDto saveComment(@RequestBody CommentSaveDto commentDto) {
        return commentService.saveComment(commentDto);
    }

    @DeleteMapping("/{id}")
    public CommentDto deleteCommentById(@PathVariable String id) {
        return commentService.deleteCommentById(id);
    }
}
