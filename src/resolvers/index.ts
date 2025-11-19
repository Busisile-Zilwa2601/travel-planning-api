import cityResolver from './city.resolver';
import forecastResolver from './forecast.resolver';
import activityRankingResolver from './ranking.resolver';

const resolvers = {
  Query: {
    ...cityResolver.Query,
    ...forecastResolver.Query,
    ...activityRankingResolver.Query,
  },
};

export default resolvers;