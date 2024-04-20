package com.pweb.eventhorizon.repository;

import com.pweb.eventhorizon.model.entity.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventCategoryRepository extends JpaRepository<EventCategory, String> {
}
