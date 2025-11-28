import { WeatherForecast, DailyForecast } from '../models/travel.interface';

const forecast_url = process.env.OPEN_METEO_API_URL as string;

// Fetch daily weather forecast data from Open-Meteo API
export const getWeatherForecast = async (
    latitude: number, 
    longitude: number,
    days = 7,
    timezone = 'auto'): Promise<WeatherForecast> => {
    try {

        const dailyVars = [
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
            "windspeed_10m_max",
            "cloudcover_mean",
        ].join(",");
        
        
        const url = `${forecast_url}?latitude=${latitude}&longitude=${longitude}&daily=${dailyVars}&timezone=${encodeURIComponent(timezone)}&forecast_days=${days}&format=json`;
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const dailyForecasts: DailyForecast[] = data.daily.time.map((date: string, index: number) => ({
            date,
            temp_max: data.daily.temperature_2m_max[index],
            temp_min: data.daily.temperature_2m_min[index],
            precipitation: data.daily.precipitation_sum[index],
            windspeed_max: data.daily.windspeed_10m_max[index],
            cloudcover: data.daily.cloudcover_mean[index],
        }));

        return {
            latitude: data.latitude,
            longitude: data.longitude,
            timezone: data.timezone,
            daily: dailyForecasts
        };
        
    } catch (error) {
        throw new Error('Error fetching weather forecast: ' + error);
    }
};