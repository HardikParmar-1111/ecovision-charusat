import { motion } from 'framer-motion'
import { Leaf, Zap, BarChart3, ShieldCheck, Globe, Info } from 'lucide-react'
import { useState } from 'react'

const CarbonFootprint = () => {
    const [electricity, setElectricity] = useState(50)
    const [acUsage, setAcUsage] = useState(6)

    // EcoVision Environmental Constants
    const factors = {
        electricity: 0.85, // kg CO2 per kWh
        ac: 1.2 // kg CO2 per hour for standard campus units
    }

    const calculation = (electricity * factors.electricity) + (acUsage * 30 * factors.ac)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="carbon-page"
        >
            <header style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>University Footprint</h1>
                <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>EcoVision Sustainability Tracker for Campus Energy Consumption</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Zap size={24} color="var(--warning)" /> Energy Input Matrix
                    </h2>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '700', color: 'var(--secondary)' }}>
                            <span>Monthly Electricity (kWh)</span>
                            <span style={{ color: 'var(--primary)' }}>{electricity} kWh</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={electricity}
                            onChange={(e) => setElectricity(e.target.value)}
                            style={{ width: '100%', height: '8px', accentColor: 'var(--primary)' }}
                        />
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '700', color: 'var(--secondary)' }}>
                            <span>Daily AC Usage (Hours)</span>
                            <span style={{ color: 'var(--primary)' }}>{acUsage} Hrs</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="24"
                            value={acUsage}
                            onChange={(e) => setAcUsage(e.target.value)}
                            style={{ width: '100%', height: '8px', accentColor: 'var(--primary)' }}
                        />
                    </div>

                    <div style={{ padding: '2rem', background: 'rgba(14, 165, 233, 0.03)', borderRadius: '20px', border: '1px solid rgba(14, 165, 233, 0.1)' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Info size={16} color="var(--primary)" /> Context Note
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Calculations are strictly focused on campus energy parameters (Electricity & HVAC) as per EcoVision sustainability guidelines to ensure zero-carbon planning for CHARUSAT blocks.
                        </p>
                    </div>
                </div>

                <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '3.5rem', textAlign: 'center' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.08)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <Leaf size={40} color="var(--accent)" />
                    </div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem' }}>Projected Carbon Impact</h2>
                    <div style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--accent)', letterSpacing: '-0.05em' }}>{Math.round(calculation)}</div>
                    <div style={{ fontSize: '1.2rem', opacity: 0.7, fontWeight: '700', marginBottom: '3rem' }}>kg CO2 / Month</div>

                    <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                            <ShieldCheck size={20} color="var(--accent)" />
                            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>Impact Rating: {calculation > 300 ? 'Action Required' : 'Sustainable Area'}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: '1.6' }}>
                            This data helps the university administration plan solar grid expansions and energy-efficient lighting across engineering & medical blocks.
                        </p>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', opacity: 0.5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                            <Globe size={14} /> Global Std. v2
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                            <BarChart3 size={14} /> Verified Logic
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default CarbonFootprint
