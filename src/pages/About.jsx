import { motion } from 'framer-motion'
import { ShieldCheck, Globe, Zap, Cpu, GraduationCap, Info } from 'lucide-react'

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="about-page"
        >
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--secondary)', letterSpacing: '-0.04em' }}>
                    CHARUSAT EcoVision
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1rem' }}>
                    University Environmental Intelligence
                </p>
            </header>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <section className="card" style={{ padding: '4rem', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Globe size={28} color="var(--primary)" /> Academic Mission
                    </h2>
                    <p style={{ lineHeight: '2', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                        CHARUSAT EcoVision is a specialized environmental monitoring and forecasting platform designed exclusively for the CHARUSAT University community.
                        Integrating real-time atmospheric data with validated meteorological models, the system helps students, faculty, and administrators make informed, sustainable decisions.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '4rem' }}>
                        <div>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem' }}>Multidisciplinary Scope</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontWeight: '600' }}>
                                <li>• Environmental Technology</li>
                                <li>• Public Health Awareness</li>
                                <li>• Academic Sustainability</li>
                                <li>• Precision Data Science</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem' }}>Data Integrity</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                All data is sourced from real-time Open-Meteo nodes. Forecasts are generated using established meteorological patterns without exaggerated AI claims.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <GraduationCap size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1.5rem' }}>University-Exclusive Intelligence</h2>
                    <p style={{ opacity: 0.8, lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                        EcoVision is restricted to CHARUSAT students and faculty. By monitoring real-time campus metrics and energy footprints, we support the university's transition toward a data-driven sustainable future.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', opacity: 0.6 }}>
                            <Info size={16} /> Version 2.0.4-EV
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', opacity: 0.6 }}>
                            <Info size={16} /> EcoVision Core Nodes Active
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default About
