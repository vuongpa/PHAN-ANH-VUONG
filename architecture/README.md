# Scoreboard API Module

## Overview

This module is responsible for managing and updating the scoreboard data, providing a real-time feed of the top 10 user scores. It exposes an API endpoint to receive score updates from authenticated sources.

## Architecture

The module will consist of the following components:

- **API Endpoint:** Receives score update requests.
- **Authentication/Authorization:** Validates the origin and authorization of update requests.
- **Score Processing:** Updates the user's score.
- **Scoreboard Management:** Maintains the top 10 scoreboard.
- **Real-time Updates:** Provides real-time updates to connected clients (e.g., the website).
- **Data Storage:** Stores user scores and scoreboard data.

## API Specification

### Endpoint: `/api/v1/scores/update`

- **Method:** `POST`
- **Request Body:** (JSON)

  ```json
  {
    "user_id": "user123", // Unique identifier for the user
    "score_increment": 10, // The amount to increase the score by
    "timestamp": "2024-10-27T10:00:00Z", // Timestamp of the action (UTC)
    "signature": "..." // HMAC signature for authentication
  }
  ```

- **Headers:**

  - `Content-Type: application/json`
  - `X-API-Key: <API_KEY>` // API Key for identification.

- **Response Codes:**

  - `200 OK`: Score updated successfully. Response body:

    ```json
    {
      "success": true,
      "message": "Score updated successfully",
      "new_score": 1200, // The user's new score
      "is_top_10": true // Whether the user is now in the top 10
    }
    ```

  - `400 Bad Request`: Invalid request format or missing parameters. Response body:

    ```json
    {
      "success": false,
      "error": "Invalid request: Missing user_id"
    }
    ```

  - `401 Unauthorized`: Invalid API key or signature. Response body:

    ```json
    {
      "success": false,
      "error": "Unauthorized: Invalid API Key or Signature"
    }
    ```

  - `500 Internal Server Error`: An unexpected error occurred. Response body:

    ```json
    {
      "success": false,
      "error": "Internal Server Error"
    }
    ```

### Endpoint: `/api/v1/scores/top10`

- **Method:** `GET`
- **Request Body:** None
- **Headers:**

  - `Content-Type: application/json`

- **Response Codes:**

  - `200 OK`: Returns Top 10 scores successfully. Response body:

    ```json
    [
      {
        "user_id": "user1",
        "score": 2500
      },
      {
        "user_id": "user2",
        "score": 2400
      },
      {
        "user_id": "user3",
        "score": 2300
      },
      {
        "user_id": "user4",
        "score": 2200
      },
      {
        "user_id": "user5",
        "score": 2100
      },
      {
        "user_id": "user6",
        "score": 2000
      },
      {
        "user_id": "user7",
        "score": 1900
      },
      {
        "user_id": "user8",
        "score": 1800
      },
      {
        "user_id": "user9",
        "score": 1700
      },
      {
        "user_id": "user10",
        "score": 1600
      }
    ]
    ```

  - `500 Internal Server Error`: An unexpected error occurred. Response body:

    ```json
    {
      "success": false,
      "error": "Internal Server Error"
    }
    ```

## Authentication and Authorization

To prevent unauthorized score updates, the following measures will be implemented:

1.  **API Key:** Each authorized client (e.g., the game server) will be assigned a unique API Key. This key should be included in the `X-API-Key` header of each request.
2.  **HMAC Signature:** Each request must include a `signature` in the request body. The signature is generated using a Hash-based Message Authentication Code (HMAC) with SHA256.

    - The HMAC will be calculated using the API Key as the secret key.
    - The message to be signed will be a concatenation of the `user_id`, `score_increment`, and `timestamp` values from the request body, in that order.
    - Example (using pseudocode):

      ```
      message = user_id + score_increment + timestamp
      signature = HMAC-SHA256(API_KEY, message)
      ```

3.  **Timestamp Validation:** The server will validate that the `timestamp` is within a reasonable time window (e.g., +/- 5 minutes) to prevent replay attacks.
4.  **Rate Limiting:** Implement rate limiting per API key to mitigate abuse.

## Real-time Updates

The module will use WebSockets to push real-time updates of the scoreboard to connected clients (e.g., the website).

- **WebSocket Endpoint:** `/ws/scoreboard`
- The server will push a JSON message to all connected clients whenever the top 10 scoreboard changes. The message format will be the same as the `/api/v1/scores/top10` response.

## Data Storage

- **Database:** A suitable database (e.g., PostgreSQL, MySQL, or Redis) will be used to store user scores and the scoreboard data.
- **Scoreboard Cache:** An in-memory cache (e.g., Redis) will be used to store the current top 10 scoreboard for fast retrieval and real-time updates. This cache will be updated whenever a score change affects the top 10.

## Error Handling

All API endpoints will return appropriate HTTP status codes and JSON error responses to indicate failures. Detailed error logs will be recorded on the server for debugging purposes.

## Technology Stack

- **Language:** [Specify the language - e.g., Python, Node.js, Go, Java]
- **Framework:** [Specify the framework - e.g., Flask, Express.js, Gin, Spring Boot]
- **Database:** [Specify the database - e.g., PostgreSQL, MySQL, Redis]
- **Real-time Communication:** WebSockets (e.g., Socket.IO, ws)

## Additional Comments/Improvements

- **Scalability:** Consider using a message queue (e.g., RabbitMQ, Kafka) to decouple the API endpoint from the score processing logic, especially if the volume of score updates is high. This will allow the score processing to scale independently.
- **Monitoring:** Implement comprehensive monitoring of the API endpoints, database performance, and real-time update mechanism. Use metrics and alerts to detect and resolve issues quickly.
- **Security:** Regularly review and update security practices to protect against vulnerabilities. Consider using a Web Application Firewall (WAF) to protect against common web attacks.
- **A/B Testing:** Consider implementing A/B testing to experiment with different scoring algorithms or reward systems.
- **User Activity Tracking:** Consider logging user activities that lead to score updates for auditing and fraud detection.

Here is flow chart:

```mermaid
    A[User Action on Website] --> B(Dispatch API Call to Server);
    B --> C{API Gateway/Load Balancer};
    C --> D[/api/v1/scores/update];
    D --> E{Authentication & Authorization};
    E -- Valid --> F[Score Processing & Update];
    E -- Invalid --> G[Return 401 Unauthorized];
    F --> H[Update User Score in DB];
    H --> I{Check if in Top 10};
    I -- Yes --> J[Update Scoreboard Cache];
    I -- No --> K[Return 200 OK];
    J --> L[Push Update to WebSocket Clients];
    L --> M[Website Scoreboard Update];
    K --> N[Return 200 OK];
    D --> O{Get /api/v1/scores/top10};
    O --> P[Return Top 10 Scoreboard]
    O --> Q[Internal Server Error]
    P --> M
```
