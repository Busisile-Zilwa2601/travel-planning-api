# Travel Planning API

## Overview

Travel planning API is a GraphQL-based backend service for a travel planning application. It provides dynamic city suggestions, weather forecasts, and activity recommendations based on weather conditions.

## Architecture Overview

Technology Stack

- Runtime: Node.js with TypeScript
- API: Apollo GraphQL Server (Standalone)
- External APIs: Open-Meteo (weather & geolocation)
- Testing: Jest with ts-jest
- Environment Management: dotenv

Folder Structure
# __tests__ /
    ### activityranking.test.ts  
    ### cities.test.ts           
    ### graphql.test             
    ### weatherforcast.test.ts   
# src/
    ### server.ts              
    ## schema/
        ### typeDefs.ts       
    ## resolvers/
        ### index.ts          
        ### city.resolver.ts   #
        ### forecast.esolver.ts 
        ### ranking.resolver.ts 
    ## services/
        ### weather.ervice.ts 
        ### geolocation.service.ts
        ### activity.ranking.service.ts
    ## middleware/
        ### cache.service.ts  
    ## models/
        ### travel.interaface.ts
    ## utils
        ### logger.ts


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
    #### Why ? 
    - Built-in HTTP server, minimal setup, production-ready
2. TypeScript
    #### Why ?
    - Type safety
3. Redis
    #### Why ?
    - Caching, storing results of expensive queries and fequently accessed objects
4. Open-Meteo API
    #### WHy ?
    - Free, no API key required, reliable weather & geolocation data
5. Jest for Testing 
    #### Why ?
    - Zero-config setup with ts-jest; built-in mocking; great TypeScript support
6. Docker 
    #### Why ? 
    - Same environment everywhere

## Ommited
1.  ExpressJs
    - Skipped: Apollo Standalone is sufficient, no unnecessary complexity
    - Impact: Reduced bundle size
2. Authentication (JWT/OAuth)
    - Skipped: Out of scope for MVP
    - Impact: No user isolation, all public queries
3. Database
    - Skipped: fetch all data from extenal api, uses Redis for caching.


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

 **Docker**
    - Start api
    
        ```
            docker-compose up --build
        ```
        
        OR
        
        ```
            docker-compose up --build -d
        ```
    - To stop and remove
        ```
            docker-compose down
        ```
    - To view logs
        ```
            docker-compose logs -f
        ```
