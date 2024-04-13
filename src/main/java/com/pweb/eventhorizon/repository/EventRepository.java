package com.pweb.eventhorizon.repository;

import com.pweb.eventhorizon.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<User, Long> {

}
