import { motion } from 'framer-motion'
import { AlertCircle, Bell, ShieldAlert, CheckCircle, Info, Calendar } from 'lucide-react'
import { useEnvironmentalData } from '../context/EnvironmentalContext'

const Alerts = () => {
    const { alerts, aqi } = useEnvironmentalData()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="alerts-page"
        >
            <header style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>EcoVision Smart Alerts</h1>
                <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Active campus-wide environmental warning system</p>
            </header>

            {alerts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
                    {alerts.map((alert, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="card"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                borderLeft: `8px solid ${alert.severity === 'Critical' ? 'var(--danger)' : 'var(--warning)'}`,
                                padding: '2.5rem'
                            }}
                        >
                            <div style={{
                                color: alert.severity === 'Critical' ? 'var(--danger)' : 'var(--warning)',
                                background: 'white',
                                padding: '1rem',
                                borderRadius: '16px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
                            }}>
                                <ShieldAlert size={32} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--secondary)' }}>{alert.type}</h3>
                                    <span style={{
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '6px',
                                        fontSize: '0.7rem',
                                        fontWeight: '800',
                                        background: alert.severity === 'Critical' ? 'var(--danger)' : 'var(--warning)',
                                        color: 'white',
                                        textTransform: 'uppercase'
                                    }}>
                                        {alert.severity}
                                    </span>
                                </div>
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.6', fontWeight: '500' }}>{alert.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="card" style={{ textAlign: 'center', padding: '5rem', marginBottom: '4rem' }}>
                    <CheckCircle size={56} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)' }}>Environment Stable</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>EcoVision Intelligence has not detected any immediate campus hazards.</p>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Bell size={20} color="var(--primary)" /> Notification Protocols
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                        EcoVision automatically triggers alerts when AQI exceeds 150 or temperatures crossing 40°C. Proactive warnings are also issued based on the 7-day Predict engine.
                    </p>
                </div>
                <div className="card" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Info size={20} color="var(--primary)" /> Historical Verification
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                        All triggered alerts are logged in the EcoVision Archives (Admin only) for correlation analysis and environmental compliance reporting.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default Alerts
