import { IResolvers } from '@graphql-tools/utils';
import { getWeatherForecast } from '../services/weather.service';
import { CacheService } from '../middleware/cache.service';
import { logger } from '../utils/logger';

/*
* Resolver for fetching weather forecasts.
* Implements caching to optimize repeated requests for the same data.
*/

const forecastResolver: IResolvers = {
  Query: {
        weatherForecast: async (_: any, { latitude, longitude, days = 7, timezone = "auto" }: { latitude: number; longitude: number; days: number; timezone: string }) => {
            try{
                logger.info(`Fetching activity ranking for coordinates: (${latitude}, ${longitude}) for ${days} days`);
                const key = `forecast:${latitude}:${longitude}:${days}:${timezone}`;
                let cached = await CacheService.get(key);
                if (cached) {
                    logger.debug(`Cache hit for key: ${key}`);
                    return cached;
                }
                
                logger.debug(`Cache miss for key: ${key}. Fetching weather forecast.`);
                logger.info(`Fetching weather forecast for coordinates: (${latitude}, ${longitude}) for ${days} days with timezone: ${timezone}`);
                
                const forecast = await getWeatherForecast(latitude, longitude, days, 'auto');
                await CacheService.set(key, forecast);
                logger.debug(`Weather forecast cached with key: ${key}`);
                return forecast;
            } catch (error) {
                logger.error('Error fetching weather forecast:', error);
                throw new Error('Failed to fetch weather forecast');
            }
        }
    }
};

export default forecastResolver;