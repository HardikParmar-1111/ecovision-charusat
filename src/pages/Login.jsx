import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Globe, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [studentId, setStudentId] = useState('')
    const [fullName, setFullName] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, user } = useAuth()
    const navigate = useNavigate()

    // Auto-login logic: If user exists in context, skip to dashboard
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await login(studentId, fullName)
            navigate('/')
        } catch (err) {
            console.error('Identification failed:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-gradient)',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{ maxWidth: '440px', width: '100%', padding: '3rem', textAlign: 'center' }}
            >
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{
                        background: 'var(--primary)',
                        color: 'white',
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 12px 24px var(--primary-glow)'
                    }}>
                        <Globe size={32} />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.03em' }}>CHARUSAT EcoVision</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem', fontWeight: '500' }}>
                        Environmental Intelligence Dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--secondary)' }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Hardik Parmar"
                            className="input-field"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--secondary)' }}>CHARUSAT Student ID</label>
                        <input
                            type="text"
                            placeholder="e.g. 22IT010"
                            className="input-field"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Initializing...' : <><LogIn size={20} /> Access Portal</>}
                    </button>
                </form>

                <div style={{
                    marginTop: '2.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.6rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontWeight: '700' }}>
                        <GraduationCap size={16} /> University Academic Protocol
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
