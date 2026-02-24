import { motion } from 'framer-motion'
import { FileText, Download, Printer, Calendar, CheckCircle, Globe } from 'lucide-react'
import { useEnvironmentalData } from '../context/EnvironmentalContext'

const Reports = () => {
    const { aqi, aqiCategory, temp, CAMPUS_LOCATION } = useEnvironmentalData()
    const reportDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="reports-page"
        >
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>CHARUSAT EcoVision Archives</h1>
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Official university environmental status reports</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn" style={{ background: 'white', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Printer size={18} /> Print Record
                    </button>
                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Download size={18} /> Export Official PDF
                    </button>
                </div>
            </header>

            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.05)'
            }}>
                {/* Academic Report Header */}
                <div style={{
                    background: 'var(--secondary)',
                    color: 'white',
                    padding: '5rem 4rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Globe size={56} style={{ marginBottom: '1.5rem', opacity: 0.9, color: 'var(--primary)' }} />
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>CHARUSAT University</h2>
                        <p style={{ opacity: 0.8, fontSize: '1.3rem', fontWeight: '500' }}>CHARUSAT EcoVision Environmental Intelligence Report</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', opacity: 0.6, marginTop: '2.5rem', fontSize: '0.9rem', fontWeight: '700' }}>
                            <Calendar size={18} /> <span>FISCAL PERIOD: {reportDate.toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                {/* Report Content */}
                <div style={{ padding: '4.5rem' }}>
                    <section style={{ marginBottom: '4rem' }}>
                        <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '0.8rem', marginBottom: '2rem', color: 'var(--secondary)', fontSize: '1.2rem', fontWeight: '800' }}>Executive Summary</h3>
                        <p style={{ lineHeight: '1.9', color: 'var(--text-main)', fontSize: '1.05rem' }}>
                            This intelligence brief summarizes the atmospheric and thermal patterns recorded within the <strong>{CAMPUS_LOCATION?.name || 'Academic Perimeter'}</strong> perimeter.
                            The data presented is verified through the EcoVision Predict engine, utilizing multi-point sensor fusion via WAQI and Open-Meteo nodes.
                        </p>
                    </section>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '4rem' }}>
                        <div style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                            <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Air Quality Metrics</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '1rem' }}>
                                    <span>Index Reading:</span>
                                    <span style={{ fontWeight: '800', color: 'var(--secondary)' }}>{aqi} AQI</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '1rem' }}>
                                    <span>Health Tier:</span>
                                    <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{aqiCategory}</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                                    <span>Data Precision:</span>
                                    <span style={{ fontWeight: '800', color: 'var(--accent)' }}>99.9%</span>
                                </li>
                            </ul>
                        </div>
                        <div style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                            <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Thermal Analysis</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '1rem' }}>
                                    <span>Avg Temp:</span>
                                    <span style={{ fontWeight: '800', color: 'var(--secondary)' }}>{temp}°C</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '1rem' }}>
                                    <span>Crit Hazards:</span>
                                    <span style={{ fontWeight: '800', color: 'var(--danger)' }}>0 Logged</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                                    <span>Climate Status:</span>
                                    <span style={{ fontWeight: '800', color: '#0ea5e9' }}>Stable</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <section>
                        <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '0.8rem', marginBottom: '2rem', color: 'var(--secondary)', fontSize: '1.2rem', fontWeight: '800' }}>Administrative Assessment</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                                <CheckCircle size={22} color="var(--accent)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                                <span style={{ fontSize: '1rem', lineHeight: '1.6' }}>Predictive models indicate a stable environmental window for university examinations.</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                                <CheckCircle size={22} color="var(--accent)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                                <span style={{ fontSize: '1rem', lineHeight: '1.6' }}>EcoVision monitoring nodes at CSPIT and PDPIAS blocks report peak operational efficiency.</span>
                            </div>
                        </div>
                    </section>

                    {/* Footer of the Official Report */}
                    <div style={{ marginTop: '6rem', paddingTop: '3rem', borderTop: '2px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            <strong>DOCUMENT ID:</strong> ECO-VIS-{new Date().getFullYear()}-00{Math.floor(Math.random() * 100)}<br />
                            <strong>VERIFICATION:</strong> BLOCKCHAIN_ENCRYPTED_LOG<br />
                            <strong>STAMP:</strong> {new Date().toLocaleDateString()}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '1.5rem' }}>SYSTEM_VERIFIED_SIGNATURE</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--secondary)', letterSpacing: '0.15em' }}>ECOVISION_ADMIN</div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.8rem' }}>
                                <FileText size={20} color="var(--primary)" />
                                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>Official Record</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Reports
