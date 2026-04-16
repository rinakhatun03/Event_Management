package com.example.eventdashboard.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // 🔐 Secret key (same key used for sign & validate)
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // ⏳ Token validity (1 day)
    private static final long EXPIRATION_TIME = 86400000;

    // ✅ Generate JWT token
    public static String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)              // username
                .claim("role", role)               // custom claim
                .setIssuedAt(new Date())           // issue time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // expiry
                .signWith(key)                     // sign
                .compact();
    }

    // ✅ Validate and parse token
    public static Claims validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired token");
        }
    }

    // ✅ Extract username
    public static String extractUsername(String token) {
        return validateToken(token).getSubject();
    }

    // ✅ Extract role
    public static String extractRole(String token) {
        return validateToken(token).get("role", String.class);
    }
}