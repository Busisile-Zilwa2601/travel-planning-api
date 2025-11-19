import { gql } from 'apollo-server';

const typeDefs = gql`
  type City {
    id: ID!
    name: String!
    country: String
    latitude: Float!
    longitude: Float!
  }

  type DailyForecast {
    date: String!
    temp_max: Float
    temp_min: Float
    precipitation: Float
    windspeed_max: Float
    cloudcover: Float
    humidity: Float
  }

  type WeatherForecast {
    latitude: Float!
    longitude: Float!
    timezone: String!
    daily: [DailyForecast!]!
  }

  type ActivityRanking {
    activity: String!
    score: Int!
    reason: String!
  }

  type Query {
    citySuggestions(input: String!, limit: Int = 10): [City!]!
    weatherForecast(latitude: Float!, longitude: Float!, days: Int = 7, timezone: String = "auto"): WeatherForecast!
    activityRanking(latitude: Float!, longitude: Float!, days: Int = 7): [ActivityRanking!]!
  }
`;

export default typeDefs;