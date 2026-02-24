/**
 * EcoVision Weather Service
 * Integration with Open-Meteo API for high-precision meteorological data.
 * Location: CHARUSAT University (22.5645, 72.9289)
 */

const CAMPUS_COORDS = { lat: 22.5645, lon: 72.9289 };

export async function getWeatherData() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${CAMPUS_COORDS.lat}&longitude=${CAMPUS_COORDS.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
        );

        if (!response.ok) throw new Error('Weather Engine Sync Failure');

        const data = await response.json();

        return {
            current: {
                temp: Math.round(data.current.temperature_2m),
                humidity: data.current.relative_humidity_2m,
                windSpeed: Math.round(data.current.wind_speed_10m),
                condition: getWeatherCondition(data.current.weather_code)
            },
            forecast: data.daily.time.map((date, i) => ({
                date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
                maxTemp: Math.round(data.daily.temperature_2m_max[i]),
                minTemp: Math.round(data.daily.temperature_2m_min[i]),
                rainProb: data.daily.precipitation_probability_max[i],
                condition: getWeatherCondition(data.daily.weather_code[i]),
                accuracy: 'Meteorological Forecast'
            }))
        };
    } catch (error) {
        console.error('Weather Service Error:', error);
        // Silent Fallback structure to prevent UI crashes
        return {
            current: { temp: 0, humidity: 0, windSpeed: 0, condition: 'Data Offline' },
            forecast: Array.from({ length: 7 }).map((_, i) => ({
                date: new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
                maxTemp: 0,
                minTemp: 0,
                rainProb: 0,
                condition: 'Offline',
                accuracy: 'Cached Segment'
            }))
        };
    }
}

function getWeatherCondition(code) {
    // WMO Weather interpretation codes (WW)
    if (code === 0) return 'Clear sky';
    if (code <= 3) return 'Partly cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 55) return 'Drizzle';
    if (code <= 65) return 'Rainy';
    if (code <= 75) return 'Snowy';
    if (code <= 82) return 'Rain showers';
    if (code <= 99) return 'Thunderstorm';
    return 'Stable';
}
