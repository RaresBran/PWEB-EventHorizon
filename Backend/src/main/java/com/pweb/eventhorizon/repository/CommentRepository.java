package com.pweb.eventhorizon.repository;

import com.pweb.eventhorizon.model.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {

    Page<Comment> findAllByEventId(String eventId, Pageable pageable);
}
