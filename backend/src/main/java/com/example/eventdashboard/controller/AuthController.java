package com.example.eventdashboard.controller;

import com.example.eventdashboard.model.User;
import com.example.eventdashboard.repository.UserRepository;
import com.example.eventdashboard.security.JwtUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    // ✅ REGISTER USER
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        if (user == null || user.getUsername() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid request data");
        }
        User existingUser = repo.findByUsername(user.getUsername());
        if (existingUser != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username already exists");
        }

        return repo.save(user);
    }

    // ✅ LOGIN USER
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        User dbUser = repo.findByUsername(user.getUsername());

        // ❌ invalid credentials
        if (dbUser == null || !dbUser.getPassword().equals(user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password");
        }

        // ✅ generate JWT
        String token = JwtUtil.generateToken(
                dbUser.getUsername(),
                dbUser.getRole());

        // ✅ return JSON response
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", dbUser.getRole());
        response.put("username", dbUser.getUsername());
        response.put("id", String.valueOf(dbUser.getId()));

        return response;
    }
}