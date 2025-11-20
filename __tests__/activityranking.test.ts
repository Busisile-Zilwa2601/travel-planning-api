import resolvers from '../src/resolvers/index';
import { CacheService } from '../src/middleware/cache.service';
import { getActivityRanking } from '../src/services/activity.ranking.service';
import { getWeatherForecast } from '../src/services/weather.service';

jest.mock('../src/middleware/cache.service', () => ({
    CacheService: {
        get: jest.fn(),
        set: jest.fn(),
    },
}));

jest.mock('../src/services/weather.service', () => ({
    getWeatherForecast: jest.fn(),
}));

jest.mock('../src/services/activity.ranking.service', () => ({
    getActivityRanking: jest.fn(),
}));

describe('Activity Ranking Resolver', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should fetch activity ranking based on latitude and longitude", async () => {
        (CacheService.get as jest.Mock).mockResolvedValue(null);
        (CacheService.set as jest.Mock).mockResolvedValue(true);

    });
});