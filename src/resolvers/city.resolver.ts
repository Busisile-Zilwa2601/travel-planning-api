import { IResolvers } from '@graphql-tools/utils';
import { getCitySuggestions } from '../services/geolocation.service';
import { CacheService } from '../middleware/cache.service';


const cityResolver: IResolvers = {
  Query: {
    citySuggestions: async (_: any, { input, limit = 10 }: { input: string; limit: number }) => {
      const key = `cities_${input}_${limit}`;
      const cached = await CacheService.get(key);
      if (cached) {
        return cached;
      }
      const suggestions = await getCitySuggestions(input, limit);
      cached && await CacheService.set(key, suggestions);
      return suggestions;
    },
  },
};

export default cityResolver;