import { IResolvers } from '@graphql-tools/utils';
import { CacheService } from '../middleware/cache.service';
import { logger } from '../utils/logger';
import {  getWeatherRankedActivities } from '../services/travel.planning.service';

/*
* Resolver for fetching weather-ranked activities for a given city name.
* Utilizes caching to improve performance on repeated queries.
*/
const travelPlanningResolver: IResolvers = {
  Query: {
    weatherRankedActivities: async (_: any, { cityName, limit, days = 7 }: { cityName: string; limit: number; days: number }) => {
        try {  
            const key = `weatherRankedActivities_${cityName}_${limit}_${days}`;
            const cached = await CacheService.get(key);
            if (cached) {
                logger.info(`Cache hit for key: ${key}`);
                return cached;
            }
            
            logger.debug(`Cache miss for key: ${key}. Fetching weather-ranked activities.`);
            logger.info(`Fetching weather-ranked activities for city: ${cityName} with limit: ${limit} and days: ${days}`);
            const results = await getWeatherRankedActivities(cityName, limit, days);
            await CacheService.set(key, results);
            return results;
        } catch (error) {
            logger.error('Error fetching weather-ranked activities:', error);
            throw new Error('Failed to fetch weather-ranked activities: ' + error);
        }
    },
  },
};

export default travelPlanningResolver;