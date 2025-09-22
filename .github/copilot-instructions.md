# Campus Club Management Suite - AI Coding Instructions

This document provides guidance for AI agents to effectively contribute to the Campus Club Management Suite codebase.

## 1. Big Picture: MERN Stack Architecture

This project is a Monorepo with a standard MERN (MongoDB, Express, React, Node.js) stack, structured with a clear separation between the frontend and backend.

-   **`frontend/`**: A React application built with Tailwind CSS. It's responsible for all UI and user interactions.
-   **`backend/`**: A Node.js and Express server that provides a RESTful API for the frontend.
-   **`database/`**: Contains configuration for MongoDB. Data is accessed via Mongoose schemas.
-   **Authentication**: Handled by Firebase Authentication (Google Login). A middleware in the backend will protect routes.

The primary data flow is: `React Components -> API calls (using hooks) -> Express Routes -> Controllers -> Mongoose Models -> MongoDB`.

## 2. Key Directories and Files

-   **`frontend/src/pages/`**: Each file here corresponds to a major feature page (e.g., `Dashboard.js`, `Clubs.js`, `Events.js`). Start here to understand the user-facing parts of a feature.
-   **`frontend/src/components/`**: Contains reusable UI components (e.g., `EventCard.js`, `ClubList.js`).
-   **`frontend/src/hooks/`**: Custom hooks for API calls and state management (e.g., `useAuth.js`, `useClubs.js`).
-   **`backend/models/`**: Mongoose schemas define the structure of our data. Key models are `User.js`, `Club.js`, `Event.js`, and `News.js`.
-   **`backend/routes/`**: Defines the API endpoints. For example, `clubs.js` will contain all routes starting with `/api/clubs`.
-   **`backend/controllers/`**: Contains the business logic for each API route. For example, `clubController.js` will have functions to `getClubs`, `createClub`, etc.
-   **`backend/middlewares/`**: For shared logic like authentication checks (`authMiddleware.js`) and error handling.

## 3. Developer Workflow

The project is split into two main parts: `frontend` and `backend`. You'll need to run them separately.

-   **To run the backend server**:
    ```bash
    cd backend
    npm install
    npm start
    ```
-   **To run the frontend development server**:
    ```bash
    cd frontend
    npm install
    npm start
    ```

The backend will typically run on a port like `3001`, and the frontend on `3000`. The frontend will proxy API requests to the backend.

## 4. API and Data Conventions

-   **API Endpoints**: Routes are RESTful and grouped by resource.
    -   `/api/users`: `GET` (profile), `POST` (register)
    -   `/api/clubs`: `GET` (all), `POST` (create), `PUT` (join)
    -   `/api/events`: `GET` (all), `POST` (create), `PUT` (rsvp)
    -   `/api/news`: `GET` (all), `POST` (create)
-   **Data Models**: Mongoose schemas in `backend/models/` are the source of truth.
    -   `User`: `{ name, email, role, clubsJoined[], badges[] }`
    -   `Club`: `{ name, category, description, members[], events[] }`
    -   `Event`: `{ title, date, description, organizerId, attendees[] }`
    -   `News`: `{ title, content, authorId, date }`
-   **Cross-component Communication**: The frontend and backend communicate exclusively through the REST API. There is no direct database access from the frontend.

## 5. Project-Specific Patterns

-   **State Management**: For the hackathon's rapid prototyping, we'll rely on React's Context API and custom hooks (`useReducer`, `useState`) for state management. Avoid introducing complex state management libraries like Redux unless necessary.
-   **Styling**: Use Tailwind CSS utility classes directly in your React components. Avoid writing custom CSS files.
-   **Authentication Flow**:
    1.  User logs in via Google on the frontend.
    2.  Firebase returns a JWT.
    3.  This JWT is sent in the `Authorization` header of API requests to the backend.
    4.  A middleware on the backend verifies the token.
    5.  **Access Control**: Only logged-in users can join clubs, RSVP to events, and post in forums. Guests can view but not interact.
