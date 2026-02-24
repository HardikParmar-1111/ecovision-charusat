import { motion } from 'framer-motion'
import { Newspaper, BookOpen, Lightbulb, ShieldCheck, Globe, Info } from 'lucide-react'

const Awareness = () => {
    const articles = [
        {
            title: 'Understanding Pollutant Fusion',
            desc: 'How EcoVision monitors the interaction between PM2.5 and atmospheric temperature nodes.',
            icon: <BookOpen size={24} />,
            color: '#0ea5e9'
        },
        {
            title: 'Sustainable HVAC Control',
            desc: 'Strategies for reducing climate footprint in university engineering & medical blocks.',
            icon: <Lightbulb size={24} />,
            color: '#10b981'
        },
        {
            title: 'Atmospheric Research at CHARUSAT',
            desc: 'How student-led environmental monitoring is shaping the future of campus sustainability.',
            icon: <Globe size={24} />,
            color: '#f59e0b'
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="awareness-page"
        >
            <header style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>Intelligence Hub</h1>
                <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>EcoVision Knowledge Center: Empowering the CHARUSAT Community</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
                {articles.map((article, i) => (
                    <div key={i} className="card" style={{ padding: '2.8rem' }}>
                        <div style={{
                            color: article.color,
                            background: `${article.color}08`,
                            width: '56px',
                            height: '56px',
                            borderRadius: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.8rem',
                            border: `1px solid ${article.color}20`
                        }}>
                            {article.icon}
                        </div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '1rem' }}>{article.title}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>{article.desc}</p>
                        <button style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--primary)',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            Study Resource <Newspaper size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: '4rem', background: 'var(--secondary)', color: 'white' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <ShieldCheck size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1.5rem' }}>EcoVision Scientific Approach</h2>
                    <p style={{ opacity: 0.8, lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                        By combining real-time data fusion with curated academic resources, EcoVision ensures that environmental awareness at CHARUSAT is grounded in scientific evidence.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', opacity: 0.5, fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Info size={14} /> Peer Reviewed
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Info size={14} /> Data Verified
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Awareness
