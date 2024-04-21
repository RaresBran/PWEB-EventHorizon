package com.pweb.eventhorizon.repository;

import com.pweb.eventhorizon.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, String> {
}
