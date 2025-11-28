import resolvers from '../src/resolvers/index';
import { CacheService } from '../src/middleware/cache.service';
import { getWeatherRankedActivities } from '../src/services/travel.planning.service';

// Mock the CacheService and travel planning service
jest.mock('../src/middleware/cache.service', () => ({
    CacheService: {
        get: jest.fn(),
        set: jest.fn(),
    },
}));

// Mock the travel planning service
jest.mock('../src/services/travel.planning.service', () => ({
    getWeatherRankedActivities: jest.fn(),
}));

describe('Travel Planning Resolver', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should fetch weather-ranked activities based on city name", async () => {
        (CacheService.get as jest.Mock).mockResolvedValue(null);
        (CacheService.set as jest.Mock).mockResolvedValue(true);

        const activities = [
            { 
                name: "Cape Town",
                city   : {
                    name: "Cape Town",
                    country: "South Africa",
                    latitude: -33.9249,
                    longitude: 18.4241
                },
                forecast: {
                    daily: [
                        {
                            date: "2025-11-21",
                            temp_max: 25.0,
                            temp_min: 15.0,
                            precipitation: 0
                        }
                    ]
                },
                activityRanking: {
                    activity: "Visit the beach", 
                    rank: 1 ,
                    reason: "Sunny weather"
                }
            },
            {
                name :  "Cape Townshend",
                city   : {
                    name: "Cape Townshend",
                    country: "Australia",
                    latitude: -34.0000,
                    longitude: 18.5000
                },
                forecast: {
                    daily: [
                        { 
                            date: "2025-11-21",
                            temp_max: 25.0,
                            temp_min: 15.0,
                            precipitation: 0,
                        }
                    ]
                },
                activityRanking: {
                    activity: "Hiking in the mountains",
                    rank: 2,
                    reason: "Clear skies"
                }
            },
        ];
        // mock the service response
        (getWeatherRankedActivities as jest.Mock).mockResolvedValue(activities);
        const results = await (resolvers as any).Query.weatherRankedActivities(null, { cityName: "Cape Town", limit: 2, days: 7 });
        expect(results).toHaveLength(2);
        expect(results[0].activityRanking.activity).toBe("Visit the beach");
        expect(results[0].activityRanking.rank).toBe(1);
        expect(results[1].activityRanking.activity).toBe("Hiking in the mountains");
        expect(results[1].activityRanking.rank).toBe(2);
    });
});