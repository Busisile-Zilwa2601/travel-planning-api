import { URL } from 'url';
import { City } from '../models/travel.interface';
import { logger } from '../utils/logger';

// Geocoding API base URL
const geolocation_url = process.env.GEOCODING_API_URL as string;

/*
    Fetch city suggestions based on a query string.
    Returns an array of City objects.
*/

export const getCitySuggestions = async (query: string, limit=10, language="en"): Promise<City[]> => {
    try {
        
        const url = new URL(geolocation_url);
        url.searchParams.append('name', query);
        url.searchParams.append('language', language);
        url.searchParams.append('count', limit.toString());
        url.searchParams.append('format', 'json');

        const response = await fetch(url.toString());
        if (!response.ok) {
            logger.error(`HTTP error! status: ${response.status}`);
            logger.debug(`Failed URL: ${url.toString()}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const results = data.results ?? [];
        return results.map((a : any) => (
            logger.info(`City suggestion found: ${a.name}, ${a.country} (${a.latitude}, ${a.longitude})`),
            logger.info(`City suggestion ID: ${a.latitude}_${a.longitude}_${a.name}`),
            {
                id: a.id ?? `${a.latitude}_${a.longitude}_${a.name}`,
                name: a.name,
                country: a.country,
                latitude: a.latitude,
                longitude: a.longitude
            }

        ));
    } catch (error) {
        logger.error('Error fetching city suggestions:', error);
        throw new Error('Error fetching city suggestions: ' + error);
    }
};
