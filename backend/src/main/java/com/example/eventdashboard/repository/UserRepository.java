package com.example.eventdashboard.repository;

import com.example.eventdashboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 🔍 Find user by username (for login)
    User findByUsername(String username);
}