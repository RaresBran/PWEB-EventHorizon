# EventHorizon

EventHorizon is a full-stack web application that helps users discover events in major Romanian cities and manage a personal list of favourites. The project is split into a Spring Boot backend and an Angular frontend.

## Features

- Browse upcoming events and filter them by city or category
- View detailed information and image galleries for each event
- Register and authenticate using JSON Web Tokens
- Add or remove events from your personal list
- Comment on events and see feedback from others
- Submit feedback about the platform
- Administrative interface for creating, editing and deleting events
- REST API documented with OpenAPI/Swagger

## Technology Stack

- **Backend:** Java 21, Spring Boot 3, Spring Security (JWT), Hibernate, Liquibase, MySQL (H2 for local development)
- **Frontend:** Angular 17 with Bootstrap styling
- **Build Tools:** Gradle for the backend, Angular CLI for the frontend

## Repository Structure

```
├── Backend   - Spring Boot application
└── Frontend  - Angular application
```

## Prerequisites

- JDK 21 or newer
- Node.js and npm
- A running MySQL instance (only when not using the embedded H2 database)

## Running the Application

### Backend

```bash
cd Backend
./gradlew bootRun
```

The server starts on `http://localhost:8080`. API documentation is available at `/swagger-ui/index.html`.

### Frontend

```bash
cd Frontend
npm install
npm start
```

The application will be served on `http://localhost:4200`.

## Running Tests

- **Backend:** `./gradlew test`
- **Frontend:** `npm run test`

## Deployment

To create production builds:

```bash
# Backend
cd Backend
./gradlew build

# Frontend
cd Frontend
npm run build
```

The Angular build artifacts will be stored in the `dist/` directory and can be served by any static web server. The backend creates an executable JAR in `build/libs`.

## License

This project is provided as-is without an explicit license. Feel free to experiment and adapt it to your needs.
