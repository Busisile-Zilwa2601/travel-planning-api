import { getCitySuggestions } from '../services/geolocation.service';
import { getActivityRanking } from '../services/activity.ranking.service';
import { getWeatherForecast } from '../services/weather.service';
import { City, WeatherForecast, ActivityRanking, WeatherResults } from '../models/travel.interface';
import { logger } from '../utils/logger';

/*
    Main service to get weather-ranked activities for a given city name.
    Combines city suggestions, weather forecast, and activity ranking services.
*/
export const getWeatherRankedActivities = async (cityName: string, limit: number, days = 7): Promise<WeatherResults[]> => {
    // Step 1: Get city suggestions
    const cities: City[] = await getCitySuggestions(cityName, limit);
    if (cities.length === 0) {
        logger.warn(`No cities found matching: ${cityName}`);
        throw new Error(`No cities found matching: ${cityName}`);
    }

    // Go through each city suggestion
    const results: WeatherResults[] = [];
    for (const city of cities) {
        
        // Step 2: Get weather forecast for the city
        const forecast: WeatherForecast = await getWeatherForecast(city.latitude, city.longitude, days);
        
        // Step 3: Get activity ranking based on the forecast
        const activityRanking: ActivityRanking[] = getActivityRanking(forecast);
        results.push({
            name: city.name,
            city,
            forecast,
            activityRanking
        });
    }

    return results;
}    
