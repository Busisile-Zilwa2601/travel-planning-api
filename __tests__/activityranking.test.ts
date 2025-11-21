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

         const daily = [
            {
            "date": "2025-11-21",
            "temp_max": 21.6,
            "temp_min": 18,
            "precipitation": 0,
            "windspeed_max": 44.6,
            "cloudcover": 8
            }
        ];
        // mock the fetch response daily forecast
        (getWeatherForecast as jest.Mock).mockResolvedValue(daily);

        const activityRankingMock = [
            {
                "activity": "Surfing",
                "score": 87,
                "reason": "Avg wind 33 km/h"
            },
            {
                "activity": "OutdoorSightseeing",
                "score": 66,
                "reason": "Avg precipitation 0 mm"
            },
            {
                "activity": "IndoorSightseeing",
                "score": 34,
                "reason": "Indoor popularity when outdoor score is low"
            },
            {
                "activity": "Skiing",
                "score": 0,
                "reason": "No snow forecasted"
            }
        ];

        (getActivityRanking as jest.Mock).mockResolvedValue(activityRankingMock);

        const results = await (resolvers as any).Query.activityRanking(null, { latitude: -33.9249, longitude: 18.4241, days: 1 });

        expect(results).toHaveLength(4);
    });
});