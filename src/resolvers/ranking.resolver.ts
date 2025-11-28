import { IResolvers } from '@graphql-tools/utils';
import { CacheService } from '../middleware/cache.service';
import { getActivityRanking } from '../services/activity.ranking.service';
import { getWeatherForecast } from '../services/weather.service';
import {  WeatherForecast} from '../models/travel.interface';
import { logger } from '../utils/logger';

/*
* Resolver for fetching activity rankings based on weather forecast.
* Combines weather data retrieval and activity ranking logic.
*/

const activityRankingResolver: IResolvers = {
    Query: {
        activityRanking: async (_: any, { latitude, longitude, days = 7 }: { latitude: number; longitude: number; days: number }) => {
           try {
                logger.info(`Fetching activity ranking for coordinates: (${latitude}, ${longitude}) for ${days} days`);
                const key = `forecast${latitude}:${longitude}:${days}:auto`;
                let forecast = await CacheService.get(key);
                if(!forecast){
                    forecast =  await getWeatherForecast(latitude, longitude, days, 'auto');
                    await CacheService.set(key, forecast);
                    logger.debug(`Weather forecast cached with key: ${key}`);
                }
                logger.info(`Calculating activity ranking based on fetched weather forecast for location: (${latitude}, ${longitude})`);
                const ranking = getActivityRanking(forecast as WeatherForecast);
                return ranking;
           } catch (error) {
                logger.error('Error fetching activity ranking:', error);
                throw new Error('Failed to fetch activity ranking');
           }
        }
    }
}

export default activityRankingResolver;