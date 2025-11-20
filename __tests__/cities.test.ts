import resolvers from '../src/resolvers/index';
import { CacheService } from '../src/middleware/cache.service';
import { getCitySuggestions } from '../src/services/geolocation.service';

jest.mock('../src/middleware/cache.service', () => ({
    CacheService: {
        get: jest.fn(),
        set: jest.fn(),
    },
}));

jest.mock('../src/services/geolocation.service', () => ({
    getCitySuggestions: jest.fn(),
}));

describe('City Resolver', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should fetch city suggestions based on query", async () => {
        (CacheService.get as jest.Mock).mockResolvedValue(null);
        (CacheService.set as jest.Mock).mockResolvedValue(true);

        const mockResponse = [
                {
                    name: "Cape Town",
                    country: "South Africa",
                    latitude: -33.9249,
                    longitude: 18.4241
                },
                {
                    name: "Cape Townshend",
                    latitude: -22.2,
                    longitude: 150.5,
                    country: "Australia"
                },
                {
                    name: "Cape Town International Airport",
                    latitude: -33.96481,
                    longitude: 18.60167,
                    country: "South Africa"
                }
            ];

        // mock the fetch response
        (getCitySuggestions as jest.Mock).mockResolvedValue(mockResponse);

        const results = await (resolvers as any).Query.citySuggestions(null, { input: "Cape Town", limit: 3 }).then((res: any) => res);
        
        expect(results).toHaveLength(3);
        expect(results[0].name).toEqual("Cape Town");
        expect(results[1].name).toBe("Cape Townshend");
        expect(results[2].name).toBe("Cape Town International Airport");
    });
});