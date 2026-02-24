const Footer = () => {
    return (
        <footer style={{
            padding: '2.5rem',
            textAlign: 'center',
            background: 'white',
            borderTop: '1px solid var(--border)',
            marginTop: 'auto'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ fontWeight: '800', color: 'var(--secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }} className="brand-font">
                    CHARUSAT EcoVision <span style={{ color: 'var(--primary)', fontWeight: '400', fontSize: '0.8rem', letterSpacing: '0.1em' }}>INTELLIGENCE</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Smart Environmental Intelligence System for CHARUSAT University
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                    <span>© {new Date().getFullYear()} CHARUSAT EcoVision Platform</span>
                    <span>Anand, Gujarat</span>
                    <span style={{ color: 'var(--primary)' }}>Real-Time Data: Open-Meteo API</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
