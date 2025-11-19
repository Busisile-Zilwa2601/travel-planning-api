import { IResolvers } from '@graphql-tools/utils';
import { getWeatherForecast } from '../services/weather.service';
import { CacheService } from '../middleware/cache.service';

const forecastResolver: IResolvers = {
  Query: {
        weatherForecast: async (_: any, { latitude, longitude, days = 7, timezone = "auto" }: { latitude: number; longitude: number; days: number; timezone: string }) => {
            const key = `forecast:${latitude}:${longitude}:${days}:${timezone}`;
            let cached = await CacheService.get(key);
            if (cached) {
                return cached;
            }

            const forecast = await getWeatherForecast(latitude, longitude, days, 'auto');
            await CacheService.set(key, forecast);
            return forecast;
        }
    }
};

export default forecastResolver;