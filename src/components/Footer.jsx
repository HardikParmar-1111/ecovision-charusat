import { motion } from 'framer-motion'
import { Info } from 'lucide-react'

const Footer = () => {
    return (
        <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
                padding: '4rem 2.5rem 2rem',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid var(--border)',
                marginTop: 'auto'
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ fontWeight: '800', color: 'var(--secondary)', fontSize: '1.4rem', marginBottom: '0.6rem' }} className="brand-font">
                    CHARUSAT EcoVision <span style={{ color: 'var(--primary)', fontWeight: '400', fontSize: '0.85rem', letterSpacing: '0.15em' }}>INTELLIGENCE</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem', fontWeight: '500' }}>
                    Smart Environmental Intelligence System for CHARUSAT University
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={14} /> Data: World Air Quality Index (WAQI)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={14} /> Weather: Open-Meteo High-Res API
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        © {new Date().getFullYear()} EcoVision Platform
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Anand, Gujarat
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(0,0,0,0.03)', paddingTop: '1.5rem', opacity: 0.8 }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                        🚀 Developed with ❤️ by 
                        <motion.span 
                            whileHover={{ 
                                textShadow: '0 0 8px rgba(14, 165, 233, 0.4)',
                                color: 'var(--primary)'
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ 
                                fontWeight: '800', 
                                color: 'var(--secondary)',
                                cursor: 'default',
                                position: 'relative',
                                display: 'inline-block'
                            }}
                        >
                            Hardik Parmar
                            <motion.div 
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                                style={{ 
                                    position: 'absolute', 
                                    bottom: '-2px', 
                                    left: 0, 
                                    height: '2px', 
                                    background: 'var(--primary)',
                                    opacity: 0.6
                                }}
                            />
                        </motion.span>
                    </p>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer
