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
         
    });
});