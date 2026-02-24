/**
 * EcoVision AQI Service
 * Powered by Open-Meteo Air Quality API.
 * Location: CHARUSAT University (22.5645, 72.9289)
 */

const LAT = 22.5645;
const LON = 72.9289;

export async function getDetailedAqiData() {
    try {
        const response = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LAT}&longitude=${LON}&hourly=us_aqi,pm2_5,pm10,ozone&timezone=auto&past_days=1`
        );

        if (!response.ok) throw new Error('AQI Analytics Latency');

        const data = await response.json();
        const hourly = data.hourly;

        // 1. Current AQI (latest index)
        const currentIndex = hourly.time.findIndex(t => new Date(t) > new Date()) - 1;
        const safeIndex = currentIndex >= 0 ? currentIndex : hourly.us_aqi.length - 1;

        // 2. 24-Hour Trend (Last 24 hours)
        const history = hourly.time.slice(safeIndex - 23, safeIndex + 1).map((time, i) => ({
            time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            aqi: hourly.us_aqi[safeIndex - 23 + i]
        }));

        // 3. 7-Day Forecast (Max AQI per day)
        // Group by 24h chunks (0-23, 24-47, etc.) starting from today
        const forecast = [];
        let lastValidAqi = hourly.us_aqi[safeIndex] || 50; // Initial fallback to current or 'Good' base

        for (let i = 0; i < 7; i++) {
            const start = safeIndex + (i * 24);
            const end = start + 24;
            const slice = hourly.us_aqi.slice(start, end).filter(val => val !== null && val !== undefined && val > 0);

            let dailyMax;
            let isEstimated = false;

            if (slice.length > 0) {
                dailyMax = Math.max(...slice);
                lastValidAqi = dailyMax;
            } else {
                // Carry over last valid data if future slice is empty
                dailyMax = lastValidAqi;
                isEstimated = true;
            }

            forecast.push({
                dayIndex: i,
                maxAqi: Math.round(dailyMax),
                category: getAqiStatus(dailyMax) + (isEstimated ? ' (Estimated)' : '')
            });
        }

        return {
            current: {
                aqi: hourly.us_aqi[safeIndex],
                category: getAqiStatus(hourly.us_aqi[safeIndex]),
                pm25: Math.round(hourly.pm2_5[safeIndex]),
                pm10: Math.round(hourly.pm10[safeIndex]),
                o3: Math.round(hourly.ozone[safeIndex]),
                station: 'Open-Meteo Virtual Station'
            },
            history,
            forecast
        };
    } catch (error) {
        console.error('AQI Intelligence Hub Failure:', error);
        return {
            current: { aqi: 0, category: 'Offline', pm25: 0, pm10: 0, o3: 0, station: 'Backup Mode' },
            history: [],
            forecast: Array.from({ length: 7 }).map((_, i) => ({ dayIndex: i, maxAqi: 0, category: 'N/A' }))
        };
    }
}

/**
 * Compatibility wrapper for existing getAqiData calls
 */
export async function getAqiData() {
    const data = await getDetailedAqiData();
    return {
        ...data.current,
        pm25: data.current.pm25,
        pm10: data.current.pm10,
        o3: data.current.o3,
        stationName: data.current.station,
        timestamp: new Date().toISOString()
    };
}

function getAqiStatus(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}
