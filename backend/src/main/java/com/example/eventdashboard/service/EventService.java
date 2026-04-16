package com.example.eventdashboard.service;

import com.example.eventdashboard.model.Event;
import com.example.eventdashboard.repository.EventRepository;
import org.springframework.stereotype.Service;
// import org.springframework.http.HttpStatus;
// import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    private final EventRepository repo;

    public EventService(EventRepository repo) {
        this.repo = repo;
    }

    public Event createEvent(Event event) {
        return repo.save(event);
    }

    public List<Event> getEvents() {
        return repo.findAll();
    }

    public Event register(Long eventId, Long userId) {

        Event event = repo.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getRegistrations() == null) {
            event.setRegistrations(new ArrayList<>());
        }

        // 🔥 DEBUG (optional)
        System.out.println("Before: " + event.getRegistrations());

        // duplicate check
        for (Long id : event.getRegistrations()) {
            if (id != null && id.equals(userId)) {
                throw new RuntimeException("Already registered!");
            }
        }

        event.getRegistrations().add(userId);

        System.out.println("After: " + event.getRegistrations());

        return repo.save(event);
    }
}