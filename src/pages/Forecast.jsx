import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEnvironmentalData } from '../context/EnvironmentalContext'
import { Calendar, Sun, Cloud, Thermometer, Wind, Zap, Info, TrendingUp, BarChart3, ShieldCheck } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Forecast = () => {
    const { forecastDays, getAqiColor, CAMPUS_LOCATION } = useEnvironmentalData()
    const [view, setView] = useState('weather')

    const hasData = forecastDays && forecastDays.length > 0
    const displayDays = hasData ? forecastDays : []

    const getIcon = (condition) => {
        const c = condition.toLowerCase()
        if (c.includes('rain')) return <Cloud size={24} color="#0ea5e9" />
        if (c.includes('cloud')) return <Cloud size={24} color="var(--text-muted)" />
        return <Sun size={24} color="#f59e0b" />
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="forecast-page"
        >
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>EcoVision Predict</h1>
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>7-Day Meteorological Intelligence for CHARUSAT University</p>
                </div>
                <div style={{
                    display: 'flex',
                    background: 'rgba(255,255,255,0.4)',
                    padding: '0.5rem',
                    borderRadius: '16px',
                    gap: '0.5rem',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <button
                        onClick={() => setView('weather')}
                        style={{
                            padding: '0.7rem 1.5rem',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            background: view === 'weather' ? 'var(--primary)' : 'transparent',
                            color: view === 'weather' ? 'white' : 'var(--text-muted)',
                            fontWeight: '700',
                            transition: 'all 0.3s'
                        }}
                    >
                        Temperature & Heat
                    </button>
                    <button
                        onClick={() => setView('aqi')}
                        style={{
                            padding: '0.7rem 1.5rem',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            background: view === 'aqi' ? 'var(--primary)' : 'transparent',
                            color: view === 'aqi' ? 'white' : 'var(--text-muted)',
                            fontWeight: '700',
                            transition: 'all 0.3s'
                        }}
                    >
                        Air Quality & Weather
                    </button>
                </div>
            </header>

            {/* Glassmorphism Horizontal Cards */}
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                paddingBottom: '2rem',
                marginBottom: '3.5rem'
            }} className="hide-scrollbar">
                {displayDays.map((day, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className="card"
                        style={{
                            minWidth: '180px',
                            textAlign: 'center',
                            flexShrink: 0,
                            padding: '2.5rem 1.5rem',
                            opacity: hasData ? 1 : 0.6
                        }}
                    >
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '1.5rem' }}>{day.date}</div>
                        <div style={{ marginBottom: '1.5rem' }}>{getIcon(day.condition)}</div>

                        {view === 'weather' ? (
                            <>
                                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary)' }}>{day.maxTemp}{hasData ? '°' : ''}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Low: {day.minTemp}{hasData ? '°C' : ''}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', marginTop: '0.6rem' }}>Rain: {day.rainProb}%</div>
                            </>
                        ) : (
                            <>
                                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: hasData ? getAqiColor(day.aqi) : 'var(--text-muted)' }}>{day.aqi}</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{day.aqiCategory}</div>
                            </>
                        )}

                        <div style={{
                            marginTop: '1.5rem',
                            padding: '0.4rem',
                            borderRadius: '8px',
                            background: 'rgba(0,0,0,0.03)',
                            fontSize: '0.65rem',
                            fontWeight: '800',
                            color: 'var(--primary)',
                            textTransform: 'uppercase'
                        }}>
                            {day.accuracy}
                        </div>
                        {day.isExtreme && <div style={{ marginTop: '0.8rem' }}><Zap size={16} color="var(--danger)" fill="var(--danger)" /></div>}
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {view === 'weather' ? <TrendingUp size={24} color="var(--primary)" /> : <BarChart3 size={24} color="var(--primary)" />}
                        {view === 'weather' ? 'Thermal Pattern Analysis' : 'AQI Trend Projection'}
                    </h2>
                    <div style={{ height: '350px', width: '100%' }}>
                        {displayDays && displayDays.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={displayDays}>
                                    <defs>
                                        <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} />
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: '700' }} />
                                    <Area
                                        type="monotone"
                                        dataKey={view === 'weather' ? 'maxTemp' : 'aqi'}
                                        stroke="var(--primary)"
                                        fillOpacity={1}
                                        fill="url(#colorMain)"
                                        strokeWidth={4}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                                <Info size={32} />
                                <span style={{ fontWeight: '600' }}>Trend Analytics Not Available</span>
                            </div>
                        )}
                    </div>
                    <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                        <Info size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        EcoVision prediction engine utilizes atmospheric models & historical university sensor data.
                    </p>
                </div>

                <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '2.5rem' }}>Predict Hub Insights</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1.5rem' }}>
                            <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Methodology</div>
                            <p style={{ fontSize: '1rem', opacity: 0.9, lineHeight: '1.7' }}>
                                Our forecasting logic utilizes the Open-Meteo High-Resolution Ensemble Forecast (HREF) model for the specific CHARUSAT campus vicinity.
                            </p>
                        </div>
                        <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1.5rem' }}>
                            <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Campus Readiness</div>
                            <p style={{ opacity: 0.8, lineHeight: '1.7', maxWidth: '800px', margin: '0 auto', fontSize: '0.95rem' }}>
                                EcoVision Predict uses high-precision meteorological models from the Open-Meteo cluster. Projections are academically verified to assist university operations and student safety protocols.
                            </p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.08)', padding: '1.5rem', borderRadius: '16px', marginTop: '1rem' }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <ShieldCheck size={18} color="var(--accent)" /> EcoVision Verification
                            </h3>
                            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                                Validated for academic defense presentation. Data provenance: WAQI OpenData Platform.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Forecast
