package com.example.eventdashboard.repository;

import com.example.eventdashboard.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}