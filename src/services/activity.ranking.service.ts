import { WeatherForecast, Activity, ActivityRanking } from "../models/travel.interface";


function normalize(value: number, min: number, max: number): number {
    if(isNaN(value)) return 0;
    return Math.max(0, Math.min(1, (value - min) / (max - min))); // Clamp between 0 and 1
}

export const getActivityRanking = (weather: WeatherForecast): ActivityRanking[] => {
    const days = weather.daily;
    if(!days || days.length === 0) {
        throw new Error("No daily weather data available for activity ranking.");
    }

    const dailyScores = days.map(day => {
        const temp_max = day.temp_max ?? 15;
        const temp_min = day.temp_min ?? 5;
        const precipitation = day.precipitation ?? 0;
        const windSpeed = day.windspeed_max ?? 5;
        const cloudCoverage = day.cloudcover ?? 50;

        const skiiTempScore = 1 - normalize(temp_max, -20, 10); // Colder is better
        const skiiPecScore = normalize(precipitation, 0, 20); // More precipitation is better
        const skiing = (0.7 * skiiTempScore + 0.3 * skiiPecScore) * 100;

        const surfTempScore = 1 - Math.abs(temp_max - 22) / 30; // Ideal around 22C
        const surfWindScore = normalize(windSpeed, 0, 40); // Strong wind is better
        const surfing = Math.max(0, (0.6 * surfWindScore + 0.4 * surfTempScore - normalize(precipitation, 0, 20) * 0.5)) * 100;

        const outDoorTemp = 1 - Math.abs((temp_max + temp_min) / 2 - 20) / 20; // Ideal around 20C
        const outDoorPrec = 1 - normalize(precipitation, 0, 20); // Less precipitation is better
        const outDoorCloud = 1 - normalize(cloudCoverage, 0, 100); // Less cloud coverage is better
        const outdoorSightseeing = Math.max(0, (0.4 * outDoorTemp + 0.2 * outDoorPrec + 0.1 * outDoorCloud)) * 100;

        const inDoorSightSeeing = Math.max(0, 100 - outdoorSightseeing); // Inverse of outdoor score

        return {
            skiing,
            surfing,
            outdoorSightseeing,
            inDoorSightSeeing
        };
    });

    const aggregateScores = dailyScores.reduce((acc, scores) => {
        acc.skiing += scores.skiing;
        acc.surfing += scores.surfing;
        acc.outdoorSightseeing += scores.outdoorSightseeing;
        acc.inDoorSightSeeing += scores.inDoorSightSeeing;
        return acc;
    }, {skiing: 0, surfing: 0, outdoorSightseeing: 0, inDoorSightSeeing: 0});

    const dayCount = dailyScores.length;

    const averageScores = {
        skiing : Math.round(aggregateScores.skiing / dayCount),
        surfing : Math.round(aggregateScores.surfing / dayCount),
        outdoorSightseeing : Math.round(aggregateScores.outdoorSightseeing / dayCount),
        inDoorSightSeeing : Math.round(aggregateScores.inDoorSightSeeing / dayCount)
    }

    const rankings: ActivityRanking[] = [
        { activity: "Skiing", score: averageScores.skiing, reason: `Avg max temp ${Math.round(days.reduce((r, d) => r + (d.temp_max ?? 0), 0)/ dayCount)}°C` },
        { activity: "Surfing", score: averageScores.surfing, reason: `Avg wind ${Math.round(days.reduce((r,d) => r + (d.windspeed_max ?? 0),0)/dayCount)} km/h` },
        { activity: "IndoorSightseeing", score: averageScores.inDoorSightSeeing, reason: `Indoor popularity when outdoor score is low` },
        { activity: "OutdoorSightseeing", score: averageScores.outdoorSightseeing, reason: `Avg precipitation ${Math.round(days.reduce((r,d)=> r + (d.precipitation ?? 0),0)/dayCount)} mm` }
    ]

     // sort descending by score
    rankings.sort((a, b) => b.score - a.score);
    return rankings;
}