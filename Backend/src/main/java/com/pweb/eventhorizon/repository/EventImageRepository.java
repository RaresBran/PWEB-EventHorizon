package com.pweb.eventhorizon.repository;

import com.pweb.eventhorizon.model.entity.EventImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventImageRepository extends JpaRepository<EventImage, String> {
    List<EventImage> findByEventId(String eventId);
}
