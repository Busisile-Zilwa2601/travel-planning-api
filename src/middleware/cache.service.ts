import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL as string);
console.log('Connected to Redis at', process.env.REDIS_URL);

export class CacheService {
    private static readonly ttlMs = 1000 * 60 * 5; // default TTL: 1 minute

    static async get<T>(key: string): Promise<T | undefined> {
        
        const data = await redisClient.get(key);
        if(!data) return undefined;

        if(Date.now() > JSON.parse(data).expiry) {
            await redisClient.del(key);
            return undefined;
        }
        
        return JSON.parse(data).value as T;
    }

    static async set<T>(key: string, value: T) : Promise<void> {
        const data = {
            value,
            expiry: Date.now() + this.ttlMs
        };
        await redisClient.set(key, JSON.stringify(data), 'PX', this.ttlMs);
    }
}