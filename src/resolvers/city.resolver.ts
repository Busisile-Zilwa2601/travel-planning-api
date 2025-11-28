import { IResolvers } from '@graphql-tools/utils';
import { getCitySuggestions } from '../services/geolocation.service';
import { CacheService } from '../middleware/cache.service';
import { logger } from '../utils/logger';


/*
* Resolver for fetching city suggestions based on user input.
* Utilizes caching to improve performance on repeated queries.
*/

const cityResolver: IResolvers = {
  Query: {
    citySuggestions: async (_: any, { input, limit = 10 }: { input: string; limit: number }) => {
      try {
        const key = `cities_${input}_${limit}`;
        const cached = await CacheService.get(key);
        if (cached) {
          return cached;
        }

        logger.debug(`Cache miss for key: ${key}. Fetching city suggestions.`);
        logger.info(`Fetching city suggestions for input: ${input} with limit: ${limit}`);
        
        const suggestions = await getCitySuggestions(input, limit);
        await CacheService.set(key, suggestions);
        return suggestions;

      } catch (error) {
        logger.error('Error fetching city suggestions:', error);
        throw new Error('Failed to fetch city suggestions' + error );
        
      }
    },
  },
};

export default cityResolver;