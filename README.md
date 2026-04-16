# 🎯 Event Dashboard

A full-stack Event Management App built with Spring Boot and React using JWT Authentication and Role-Based Access.

## 🚀 Features
- User Registration & Login
- JWT Authentication
- Role-based dashboard (USER / ORGANIZER)
- Create & view events
- Event registration (no duplicates)

## 🛠️ Tech Stack
- Backend: Spring Boot, JPA, H2, JWT
- Frontend: React, Axios, React Router

## ▶️ Run Project

### Backend
mvn spring-boot:run

### Frontend
npm install
npm start

## 🔐 APIs
- POST /api/auth/register
- POST /api/auth/login
- GET /api/events
- POST /api/events
- POST /api/events/{id}/register
