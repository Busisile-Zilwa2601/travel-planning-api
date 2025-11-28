export interface City {
    id?: string;
    name: string;
    country?: string;
    latitude: number;
    longitude: number;
}

export interface DailyForecast {
    temp_max?: number;
    temp_min?: number;
    precipitation?: number;
    windspeed_max?: number;
    cloudcover?: number;
    date: string;
}

export interface WeatherForecast {
    latitude: number;
    longitude: number;
    timezone: string;
    daily: DailyForecast[];
}

export interface ActivityRanking {
    activity: Activity;
    score: number;
    reason: string;
}

export interface WeatherResults {
    name: string;
    city: City;
    forecast: WeatherForecast;
    activityRanking: ActivityRanking[];
}

export type Activity = "Skiing" | "Surfing" | "IndoorSightseeing" | "OutdoorSightseeing";
