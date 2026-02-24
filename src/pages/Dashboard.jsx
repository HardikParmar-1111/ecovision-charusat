import { motion } from 'framer-motion'
import { useEnvironmentalData } from '../context/EnvironmentalContext'
import { Wind, Thermometer, Droplets, ArrowRight, ShieldCheck, AlertTriangle, Calendar, Sun, Cloud, Info, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import AqiAlertPopup from '../components/AqiAlertPopup'
import { useAqiAlert } from '../hooks/useAqiAlert'

const Dashboard = () => {
    const {
        aqi = 0,
        temp = 0,
        humidity = 0,
        windSpeed = 0,
        condition = '...',
        aqiCategory = 'Initializing...',
        getAqiColor = () => '#ccc',
        lastUpdated = '...',
        CAMPUS_LOCATION = {},
        forecastDays = [],
        forecastSummary = {},
        alerts = [],
        advisories = [],
        requestNotificationPermission,
        details = { pm25: 0, pm10: 0, o3: 0 }
    } = useEnvironmentalData()
    const { user } = useAuth()
    const [notifStatus, setNotifStatus] = useState(Notification.permission)

    // Production Alert System
    const { isPopupOpen, closeAlert, aqiValue } = useAqiAlert()

    const handleEnableNotifications = async () => {
        const granted = await requestNotificationPermission()
        setNotifStatus(granted ? 'granted' : 'denied')
    }

    const firstName = user?.student_name?.split(' ')[0] || 'Scholar'

    const metrics = [
        { label: 'Air Quality Index', value: aqi, unit: 'AQI', icon: <Wind />, color: getAqiColor(aqi), path: '/aqi' },
        { label: 'Ambient Temperature', value: temp, unit: '°C', icon: <Thermometer />, color: 'var(--primary)', path: '/weather' },
        { label: 'Current Humidity', value: humidity, unit: '%', icon: <Droplets />, color: '#0ea5e9', path: '/weather' }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard"
        >
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>
                        CHARUSAT EcoVision Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '500' }}>
                        <ShieldCheck size={18} color="var(--accent)" />
                        Intelligence active for <span style={{ color: 'var(--secondary)', fontWeight: '700' }}>{CAMPUS_LOCATION.name}</span>
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Online</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Updated: {lastUpdated}</div>
                </div>
            </header>

            <AqiAlertPopup
                isOpen={isPopupOpen}
                onClose={closeAlert}
                aqiValue={aqiValue}
            />

            {/* Smart Alert Engine */}
            {alerts.length > 0 && (
                <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {alerts.map((alert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="card"
                            style={{
                                background: alert.severity === 'Critical' ? 'rgba(244, 63, 94, 0.05)' : 'white',
                                border: alert.severity === 'Critical' ? '1px solid rgba(244, 63, 94, 0.2)' : '1px solid var(--border)',
                                padding: '1.2rem 1.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.2rem',
                                color: alert.severity === 'Critical' ? 'var(--danger)' : 'var(--warning)',
                                borderRadius: '16px'
                            }}
                        >
                            {alert.severity === 'Critical' ? <AlertTriangle size={24} /> : <Calendar size={24} />}
                            <div style={{ flex: 1 }}>
                                <strong style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{alert.type}</strong>
                                <div style={{ fontSize: '1rem', fontWeight: '500', marginTop: '0.2rem', color: 'var(--secondary)' }}>{alert.message}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
                {metrics.map((stat, i) => (
                    <Link to={stat.path} key={i} className="card" style={{ textDecoration: 'none', color: 'inherit', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div style={{
                                color: stat.color,
                                background: 'white',
                                padding: '1rem',
                                borderRadius: '16px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {stat.icon}
                            </div>
                            <ArrowRight size={20} color="var(--text-muted)" />
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.4rem' }}>{stat.label}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            <span style={{ fontSize: '2.8rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.04em' }}>{stat.value}</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-muted)' }}>{stat.unit}</span>
                        </div>
                        <div style={{ marginTop: '1rem', height: '4px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.min(stat.value, 100)}%`, background: stat.color }}></div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Campus Preparedness Advisory Engine */}
            <div style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <ShieldCheck size={22} color="var(--primary)" /> Campus Preparedness Advisory
                    </h2>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', padding: '0.4rem 0.8rem', background: 'var(--border)', borderRadius: '8px' }}>
                        Advisory Mode Active
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {/* Notification Opt-in Side Card */}
                    {notifStatus !== 'granted' && (
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="card"
                            style={{
                                padding: '1.8rem',
                                background: 'var(--primary)',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                    <Bell size={24} />
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>Stay Informed</h3>
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                    Enable background alerts to receive immediate campus safety notifications for high AQI, heatwaves, or heavy storms.
                                </p>
                            </div>
                            <button
                                onClick={handleEnableNotifications}
                                style={{
                                    background: 'white',
                                    color: 'var(--primary)',
                                    border: 'none',
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    fontWeight: '800',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Bell size={16} /> Enable Alerts
                            </button>
                        </motion.div>
                    )}

                    {advisories && advisories.length > 0 ? (
                        advisories.map((advisory) => (
                            <motion.div
                                key={advisory.id}
                                whileHover={{ y: -5 }}
                                className="card"
                                style={{
                                    padding: '1.8rem',
                                    borderLeft: `5px solid ${advisory.type === 'danger' ? 'var(--danger)' : advisory.type === 'warning' ? 'var(--warning)' : advisory.type === 'success' ? 'var(--accent)' : 'var(--primary)'}`
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--secondary)' }}>{advisory.title}</h3>
                                    <div style={{
                                        padding: '0.3rem 0.6rem',
                                        borderRadius: '6px',
                                        fontSize: '0.65rem',
                                        fontWeight: '900',
                                        textTransform: 'uppercase',
                                        background: advisory.type === 'danger' ? 'rgba(239, 68, 68, 0.1)' : advisory.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                        color: advisory.type === 'danger' ? '#ef4444' : advisory.type === 'warning' ? '#f59e0b' : '#10b981'
                                    }}>
                                        {advisory.type === 'danger' ? 'Priority' : 'Guidance'}
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '0' }}>
                                    {advisory.message}
                                </p>
                            </motion.div>
                        ))
                    ) : (
                        <div className="card" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1', border: '1px dashed var(--border)' }}>
                            <p style={{ color: 'var(--text-muted)', fontWeight: '600', margin: 0 }}>
                                Environmental parameters are within standard academic operational ranges.
                                <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.7 }}>No specialized preparedness advisories required at this timestamp.</span>
                            </p>
                        </div>
                    )}
                </div>
                <div style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Info size={12} /> Recommendations are strictly advisory for campus preparedness based on live EcoVision telemetric streams.
                </div>
            </div>

            {/* EcoVision Predict Quick View */}
            <div className="card" style={{ marginBottom: '3.5rem', padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Calendar size={22} color="var(--primary)" /> 7-Day Intelligence Predict
                    </h2>
                    <Link to="/forecast" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', background: 'rgba(14, 165, 233, 0.05)', padding: '0.5rem 1rem', borderRadius: '10px' }}>Full Analysis</Link>
                </div>
                <div style={{ display: 'flex', gap: '1.2rem', overflowX: 'auto', paddingBottom: '1rem' }} className="hide-scrollbar">
                    {forecastDays && forecastDays.length > 0 ? (
                        forecastDays.slice(0, 7).map((day, i) => (
                            <div key={i} style={{
                                minWidth: '110px',
                                textAlign: 'center',
                                padding: '1.5rem 1rem',
                                borderRadius: '18px',
                                background: 'white',
                                border: '1px solid rgba(0,0,0,0.03)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                            }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.8rem' }}>{day.date?.split(',')[0] || 'Day'}</div>
                                <div style={{ margin: '1rem 0' }}>
                                    {day.condition?.toLowerCase().includes('sunny') || day.condition?.toLowerCase().includes('clear') ? <Sun size={24} color="#f59e0b" /> : <Cloud size={24} color="#64748b" />}
                                </div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--secondary)' }}>{day.maxTemp}°</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: '800', marginTop: '0.4rem', color: getAqiColor?.(day.aqi) || '#ccc' }}>{day.aqi} AQI</div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', width: '100%', color: 'var(--text-muted)', fontWeight: '600' }}>
                            Predictive data currently propagating...
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ background: 'var(--secondary)', color: 'white', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Smart Campus Advisory</h2>
                        <p style={{ opacity: 0.8, lineHeight: '1.7', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                            {alerts.length > 0
                                ? "EcoVision Predict identifies environmental risks for the coming days. Proactive campus management is advised to ensure student safety."
                                : "Atmospheric conditions are currently optimal. No immediate preventive measures required for campus operations."}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/health" className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>Safety Protocols</Link>
                            <Link to="/about" className="btn" style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.1)', color: 'white' }}>System Intel</Link>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.8rem' }}>University Impact Analysis</h2>
                    <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1.5rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Predict Confidence</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--secondary)' }}>High (94%)</div>
                                <div style={{ fontSize: '0.7rem', background: '#ecfdf5', color: 'var(--accent)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>STABLE</div>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            EcoVision uses real-time WAQI and Open-Meteo data streams to provide high-precision environmental intelligence specifically for the CHARUSAT campus vicinity.
                        </p>
                    </div>
                </div>
            </div>

            {/* Global Attribution Footer */}
            <footer style={{ marginTop: '5rem', padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <Info size={14} /> Data: World Air Quality Index (WAQI)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <Info size={14} /> Weather: Open-Meteo High-Resolution Forecast (No API Key)
                    </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                    © {new Date().getFullYear()} CHARUSAT EcoVision – Smart Environmental Intelligence System for CHARUSAT University
                </div>
            </footer>
        </motion.div>
    )
}

export default Dashboard
