import { IResolvers } from '@graphql-tools/utils';
import { CacheService } from '../middleware/cache.service';
import { getActivityRanking } from '../services/activity.ranking.service';
import { getWeatherForecast } from '../services/weather.service';
import {  WeatherForecast} from '../models/travel.interface';

const activityRankingResolver: IResolvers = {
    Query: {
        activityRanking: async (_: any, { latitude, longitude, days = 7 }: { latitude: number; longitude: number; days: number }) => {
            const key = `forecast${latitude}:${longitude}:${days}:auto`;
            let forecast = await CacheService.get(key);
            if(!forecast){
                forecast =  await getWeatherForecast(latitude, longitude, days, 'auto');
                await CacheService.set(key, forecast);
            }
            const ranking = getActivityRanking(forecast as WeatherForecast);
            return ranking;
        }
    }
}

export default activityRankingResolver;