import resolvers from '../src/resolvers/index';
import { CacheService } from '../src/middleware/cache.service';
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

describe('Weather Forecast Resolver', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    

    it("should fetch weather forecast based on latitude and longitude", async () => {
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
            },
            {
            "date": "2025-11-22",
            "temp_max": 23.7,
            "temp_min": 18.1,
            "precipitation": 0,
            "windspeed_max": 46.9,
            "cloudcover": 41
            },
        ];
        // mock the fetch response
        (getWeatherForecast as jest.Mock).mockResolvedValue(daily);

        const results = await (resolvers as any).Query.weatherForecast(null, { latitude: -33.9249, longitude: 18.4241, days: 2, timezone: 'auto' });
        expect(results).toHaveLength(2);
        expect(results[0].date).toBe("2025-11-21");
        expect(results[0].temp_max).toBe(21.6);
        expect(results[0].temp_min).toBe(18);
        expect(results[0].precipitation).toBe(0);
        expect(results[0].windspeed_max).toBe(44.6);
        expect(results[0].cloudcover).toBe(8);
    });
});