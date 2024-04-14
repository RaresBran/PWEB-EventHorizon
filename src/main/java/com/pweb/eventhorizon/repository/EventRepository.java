package com.pweb.eventhorizon.repository;

import com.pweb.eventhorizon.model.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {

    List<Event> findAllByLocations_City(String city);
}
