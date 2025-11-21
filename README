# Travel Planning API

## Overview

Travel planning API is a GraphQL-based backend service for a travel planning application. It provides dynamic city suggestions, weather forecasts, and AI-driven activity recommendations based on weather conditions.

## Architecture Overview

Technology Stack

- ** Runtime: Node.js with TypeScript
- ** API: Apollo GraphQL Server (Standalone)
- ** External APIs: Open-Meteo (weather & geolocation)
- ** Testing: Jest with ts-jest
- ** Environment Management: dotenv

Folder Structure
__tests__
├── activityranking.test.ts  # activity tests
├── cities.test.ts           # city retrieving test
├── graphql.test             # Health test
├── weatherforcast.test.ts   # weather test base on the location
src/
├── server.ts              # Apollo Server initialization
├── schema/
│   └── typeDefs.ts       # GraphQL type definitions
├── resolvers/
│   ├── index.ts          # Root resolver exports
│   ├── city.resolver.ts   # City suggestion logic
│   ├── forecast.esolver.ts # Weather forecast logic
│   └── ranking.resolver.ts # Activity ranking logic
├── services/
│   ├── weather.ervice.ts # Weather & geolocation API calls
│   ├── geolocation.service.ts # City search & caching
│   └── activity.ranking.service.ts # Weather-based activity scoring
├── middleware/
│   └── cache.service.ts  # In-memory/Redis caching layer
├── models/
│   └── travel.interaface.ts          # TypeScript interfaces & types


## Data Flow

GraphQL Query
    ↓
Resolver Layer
    ↓
Cache Check (CacheService)
    ↓
Service Layer (OpenMeteo/Geolocation)
    ↓
Response

# Technical Choices & Rationale
1. Apollo Serve (Standalone)
    ## Why ? 
    - Built-in HTTP server, minimal setup, production-ready
2. TypeScript
    ## Why ?
    - Type safety
3. Redis
    ## Why ?
    - Caching, storing results of expensive queries and fequently accessed objects
4. Open-Meteo API
    ## WHy ?
    - Free, no API key required, reliable weather & geolocation data
5. Jest for Testing 
    ## Why ?
    - Zero-config setup with ts-jest; built-in mocking; great TypeScript support


# Get Started
1. Clone the repository:
   ```
   git clone https://github.com/Busisile-Zilwa2601/travel-planning-api.git
   cd travel-planning-api
   ```
2. Install dependencies:
   ```
   npm install
   ```

3. Run test:
   ```
   npm test
   ```

4. Start Server:
   ```
   npm start
   ```
