import cityResolver from './city.resolver';
import forecastResolver from './forecast.resolver';
import activityRankingResolver from './ranking.resolver';
import travelPlanningResolver from './travel.planning.resolver';

const resolvers = {
  Query: {
    ...cityResolver.Query,
    ...forecastResolver.Query,
    ...activityRankingResolver.Query,
    ...travelPlanningResolver.Query,
  },
};

export default resolvers;