/**
 * EcoVision Historical Analytics Service
 * Retrieves 60-day archived data from Open-Meteo for university impact analysis.
 * Station: CHARUSAT University (22.5645, 72.9289)
 */

const LAT = 22.5645;
const LON = 72.9289;

export async function getHistoricalAnalytics() {
    try {
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];
        const startDate = new Date(today.setDate(today.getDate() - 60)).toISOString().split('T')[0];

        // Fetch Weather and Air Quality Archives in parallel
        const [weatherRes, aqiRes] = await Promise.all([
            fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${LAT}&longitude=${LON}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean&timezone=auto`),
            fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LAT}&longitude=${LON}&start_date=${startDate}&end_date=${endDate}&hourly=us_aqi&timezone=auto`)
        ]);

        if (!weatherRes.ok || !aqiRes.ok) throw new Error('Analytical Archive Latency');

        const weatherData = await weatherRes.json();
        const aqiData = await aqiRes.json();

        // Process hourly US AQI into daily max for consistent comparison
        const dailyAqi = [];
        const hourlyAqi = aqiData.hourly.us_aqi;
        for (let i = 0; i < hourlyAqi.length; i += 24) {
            const daySlice = hourlyAqi.slice(i, i + 24).filter(v => v !== null && v > 0);
            dailyAqi.push(daySlice.length > 0 ? Math.max(...daySlice) : null);
        }

        const dailyTemp = weatherData.daily.temperature_2m_mean;

        // Group into periods:
        // Current Week (0-6), Prev Week (7-13)
        // Current Month (0-29), Prev Month (30-59)
        // Note: Array is chronological (oldest first). We need most recent first for our logic.
        const revTemp = [...dailyTemp].reverse();
        const revAqi = [...dailyAqi].reverse();

        const calculateMetrics = (tempSlice, aqiSlice) => {
            const validTemp = tempSlice.filter(v => v !== null);
            const validAqi = aqiSlice.filter(v => v !== null);

            return {
                avgTemp: validTemp.length > 0 ? (validTemp.reduce((a, b) => a + b, 0) / validTemp.length).toFixed(1) : 0,
                maxAqi: validAqi.length > 0 ? Math.max(...validAqi) : 0,
                unhealthyDays: validAqi.filter(v => v > 100).length
            };
        };

        const comparison = {
            week: {
                current: calculateMetrics(revTemp.slice(0, 7), revAqi.slice(0, 7)),
                previous: calculateMetrics(revTemp.slice(7, 14), revAqi.slice(7, 14))
            },
            month: {
                current: calculateMetrics(revTemp.slice(0, 30), revAqi.slice(0, 30)),
                previous: calculateMetrics(revTemp.slice(30, 60), revAqi.slice(30, 60))
            }
        };

        return {
            comparison,
            status: 'ok',
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.warn('Historical Intelligence Offline:', error);
        return { status: 'offline', comparison: null };
    }
}
