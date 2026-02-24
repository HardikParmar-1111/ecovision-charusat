import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wind, ShieldCheck, Activity, Info, BarChart3, TrendingUp, Globe } from 'lucide-react'
import { useEnvironmentalData } from '../context/EnvironmentalContext'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { supabase } from '../lib/supabaseClient'

const AQI = () => {
    const {
        aqi = 0,
        aqiCategory = 'Offline',
        getAqiColor = () => '#ccc',
        CAMPUS_LOCATION = {},
        details = { pm25: 0, pm10: 0, o3: 0, station: 'Searching...' },
        aqiHistory = []
    } = useEnvironmentalData()

    const history = aqiHistory.length > 0 ? aqiHistory : Array.from({ length: 24 }).map((_, i) => ({
        time: `${i}:00`,
        aqi: 0
    }))

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aqi-page"
        >
            <header style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>Air Quality Intelligence</h1>
                <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Real-time atmospheric analysis for CHARUSAT Campus vicinity</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
                {/* Main AQI Card */}
                <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
                    <div style={{
                        color: getAqiColor(aqi),
                        background: 'white',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
                    }}>
                        <Wind size={40} />
                    </div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current AQI</div>
                    <div style={{ fontSize: '5rem', fontWeight: '900', color: 'var(--secondary)', margin: '1rem 0', letterSpacing: '-0.04em' }}>{aqi}</div>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '12px',
                        background: getAqiColor(aqi),
                        color: 'white',
                        fontWeight: '800',
                        fontSize: '1rem'
                    }}>
                        {aqiCategory.toUpperCase()}
                    </div>
                </div>

                {/* AQI Breakdown */}
                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <ShieldCheck size={22} color="var(--primary)" /> Particulate Breakdown
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { label: 'PM2.5 (Fine Particles)', value: `${details.pm25} µg/m³` },
                            { label: 'PM10 (Coarse Particles)', value: `${details.pm10} µg/m³` },
                            { label: 'O3 (Ozone) Level', value: `${details.o3} ppb` },
                            { label: 'Primary Station', value: details.station || 'ANAND_STATION' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>{item.label}</span>
                                <span style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '0.9rem' }}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', background: 'rgba(14, 165, 233, 0.05)', padding: '1rem', borderRadius: '12px' }}>
                        <Globe size={18} />
                        <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Data Source: WAQI Real-Time Feed</span>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: '3rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <TrendingUp size={24} color="var(--primary)" /> 24-Hour Atmospheric Trend
                </h2>
                <div style={{ height: '400px', width: '100%' }}>
                    {history && history.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={getAqiColor?.(aqi) || '#ccc'} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={getAqiColor?.(aqi) || '#ccc'} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: '700' }} />
                                <Area type="monotone" dataKey="aqi" stroke={getAqiColor?.(aqi) || '#ccc'} fillOpacity={1} fill="url(#colorAqi)" strokeWidth={4} />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
                            <Activity size={24} style={{ marginRight: '10px' }} /> Atmospheric Segment Not Available
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '3.5rem', padding: '2rem', background: 'var(--secondary)', color: 'white', borderRadius: '24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>Academic Justification</h3>
                <p style={{ opacity: 0.8, lineHeight: '1.7', maxWidth: '800px', margin: '0 auto', fontSize: '0.95rem' }}>
                    CHARUSAT EcoVision Air Quality & Weather Hub provides a multidisciplinary approach to air quality analysis, correlating pollutant density with campus microclimate variables.
                    This system supports CHARUSAT's environmental science research initiatives.
                </p>
            </div>
        </motion.div>
    )
}

export default AQI
