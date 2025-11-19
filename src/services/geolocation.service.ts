import { URL } from 'url';
import { City } from '../models/travel.interface';


const geolocation_url = process.env.GEOCODING_API_URL as string;


export const getCitySuggestions = async (query: string, limit=10, language="en"): Promise<City> => {
    try {
        const url = new URL(geolocation_url);
        url.searchParams.append('name', query);
        url.searchParams.append('language', language);
        url.searchParams.append('count', limit.toString());
        url.searchParams.append('format', 'json');

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const results = data.results ?? [];
        return results.map((a : any) => ({
            id: a.id ?? `${a.latitude}_${a.longitude}_${a.name}`,
            name: a.name,
            country: a.country,
            latitude: a.latitude,
            longitude: a.longitude
        }));
    } catch (error) {
        throw new Error('Error fetching city suggestions: ' + error);
    }
};
