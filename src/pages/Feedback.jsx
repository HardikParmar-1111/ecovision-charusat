import { motion } from 'framer-motion'
import { Send, MessageSquare, ShieldCheck, Info } from 'lucide-react'
import { useState } from 'react'

const Feedback = () => {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="feedback-page"
        >
            <header style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>Community Feedback</h1>
                <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Your observations help optimize EcoVision Intelligence for CHARUSAT</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                <div className="card" style={{ padding: '3.5rem' }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                            <div style={{
                                background: '#ecfdf5',
                                color: 'var(--accent)',
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem'
                            }}>
                                <ShieldCheck size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)' }}>Report Received</h2>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem' }}>Your environmental feedback has been logged in the EcoVision network.</p>
                            <button className="btn btn-primary" style={{ marginTop: '2.5rem' }} onClick={() => setSubmitted(false)}>Submit Another Report</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <MessageSquare size={24} color="var(--primary)" /> Environmental Observation
                            </h2>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--secondary)' }}>What did you observe?</label>
                                <select style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    background: 'white',
                                    fontWeight: '500'
                                }}>
                                    <option>Localized Dust / Construction</option>
                                    <option>Unexpected Heat Signature</option>
                                    <option>Strong Odor / Pollution</option>
                                    <option>General System Feedback</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--secondary)' }}>Detailed Log</label>
                                <textarea
                                    placeholder="Describe the environmental activity at CHARUSAT..."
                                    rows="5"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        background: 'white',
                                        fontSize: '0.95rem',
                                        resize: 'none'
                                    }}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                <Send size={20} /> Transmit Observation
                            </button>
                        </form>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card" style={{ padding: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Info size={20} color="var(--primary)" /> Data Fusion Protocol
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                            Community observations are cross-referenced with real-time API feeds to provide a "sensor-plus-human" intelligence layer for the university.
                        </p>
                    </div>
                    <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.2rem' }}>Anonymous Analysis</h3>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.7' }}>
                            All feedback is processed anonymously and aggregated into the EcoVision Impact analytics for administrative review.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Feedback
