package com.example.eventdashboard.controller;

import com.example.eventdashboard.model.Event;
import com.example.eventdashboard.service.EventService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @PostMapping
    public Event create(@RequestBody Event event) {
        return service.createEvent(event);
    }

    @GetMapping
    public List<Event> getAll() {
        return service.getEvents();
    }

    @PostMapping("/{id}/register")
    public Event register(@PathVariable Long id, @RequestBody java.util.Map<String, Long> body) {
        Long userId = body.get("userId");
        return service.register(id, userId);
    }
}