import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Info, BarChart3, ShieldCheck } from 'lucide-react'
import { useEnvironmentalData } from '../context/EnvironmentalContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const Trends = () => {
    const { forecastDays, historicalComparison, CAMPUS_LOCATION } = useEnvironmentalData()

    // Map real 7-day forecast data for EcoVision Archives
    const historicalData = forecastDays.length > 0 ? forecastDays.map(day => ({
        day: day.date.split(',')[0],
        aqi: day.aqi,
        temp: day.maxTemp
    })) : [
        { day: '...', aqi: 0, temp: 0 }
    ]

    const renderComparisonCard = (title, current, previous) => {
        if (!current || !previous) return null;

        const getTrend = (cur, prev) => {
            if (cur > prev) return { icon: '↑', color: 'var(--danger)', label: 'Increased' };
            if (cur < prev) return { icon: '↓', color: 'var(--accent)', label: 'Decreased' };
            return { icon: '→', color: 'var(--text-muted)', label: 'Stable' };
        };

        const tempTrend = getTrend(parseFloat(current.avgTemp), parseFloat(previous.avgTemp));
        const aqiTrend = getTrend(current.maxAqi, previous.maxAqi);

        // Logical "Improved" or "Degraded"
        // Improvement = Lower AQI or lower unhealthy days
        const isImproved = current.maxAqi <= previous.maxAqi && current.unhealthyDays <= previous.unhealthyDays;

        return (
            <div className="card" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--secondary)' }}>{title} Comparison</h3>
                    <div style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '10px',
                        fontSize: '0.75rem',
                        fontWeight: '900',
                        background: isImproved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: isImproved ? '#10b981' : '#ef4444'
                    }}>
                        {isImproved ? 'Environment Improved' : 'Environment Degraded'}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ padding: '1.2rem', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Avg Temperature</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)' }}>{current.avgTemp}°C</span>
                            <span style={{ fontSize: '0.9rem', color: tempTrend.color, fontWeight: '900' }}>{tempTrend.icon}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>Prev: {previous.avgTemp}°C</div>
                    </div>

                    <div style={{ padding: '1.2rem', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Maximum AQI</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)' }}>{current.maxAqi}</span>
                            <span style={{ fontSize: '0.9rem', color: aqiTrend.color, fontWeight: '900' }}>{aqiTrend.icon}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>Prev: {previous.maxAqi}</div>
                    </div>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: 'var(--secondary)', borderRadius: '12px', color: 'white' }}>
                    <TrendingUp size={18} color="var(--primary)" />
                    <div style={{ fontSize: '0.85rem' }}>
                        <strong>{current.unhealthyDays} Unhealthy Days</strong> detected in this period
                        {current.unhealthyDays > previous.unhealthyDays ? ' (Significant increase)' : ' (Stable pattern)'}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="trends-page"
        >
            <header style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>Impact Trends & Analysis</h1>
                <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>EcoVision Long-Term Environmental Performance for CHARUSAT University</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
                {historicalComparison ? (
                    <>
                        {renderComparisonCard('Current Week', historicalComparison.week.current, historicalComparison.week.previous)}
                        {renderComparisonCard('Current Month', historicalComparison.month.current, historicalComparison.month.previous)}
                    </>
                ) : (
                    <div className="card" style={{ padding: '3.5rem', gridColumn: '1 / -1', textAlign: 'center', border: '1px dashed var(--border)' }}>
                        <Info size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Historical Intelligence Offline</h3>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                            The EcoVision Analytical Engine is currently synchronizing archived data from the Open-Meteo cluster. Historical comparison tool unavailable at this moment.
                        </p>
                    </div>
                )}
            </div>

            <div className="card" style={{ padding: '3.5rem', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <BarChart3 size={24} color="var(--primary)" /> Predictive Forecast Matrix
                </h2>
                <div style={{ height: '450px', width: '100%' }}>
                    {historicalData && historicalData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historicalData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: '700' }} />
                                <Legend wrapperStyle={{ paddingTop: '2rem' }} />
                                <Line yAxisId="left" type="monotone" dataKey="aqi" stroke="#f97316" strokeWidth={4} dot={{ r: 6, fill: '#f97316' }} activeDot={{ r: 8 }} name="AQI Index" />
                                <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 6, fill: '#0ea5e9' }} activeDot={{ r: 8 }} name="Temp (°C)" />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                            Impact segment data unavailable.
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Calendar size={20} color="var(--primary)" /> Seasonal Smoothing
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                        EcoVision algorithms apply seasonal smoothing to baseline datasets, ensuring that outliers (such as localized construction dust) do not skew the long-term impact trends for the university.
                    </p>
                </div>
                <div className="card" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <ShieldCheck size={20} color="var(--primary)" /> Data Provenance
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                        All trend data for <strong>{CAMPUS_LOCATION.name}</strong> is archived in the EcoVision Cloud, providing a verifiable record for university sustainability audits and environmental compliance.
                    </p>
                </div>
                <div className="card" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Info size={20} color="var(--primary)" /> Academic Value
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                        This module enables students to correlate academic performance windows with localized air quality patterns, forming a basis for multidisciplinary health studies at CHARUSAT.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default Trends
