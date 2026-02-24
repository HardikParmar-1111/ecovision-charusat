import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('EcoVision Runtime Exception:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-gradient)',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card"
                        style={{ maxWidth: '500px', padding: '4rem' }}
                    >
                        <div style={{
                            background: 'rgba(244, 63, 94, 0.1)',
                            color: 'var(--danger)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem'
                        }}>
                            <AlertCircle size={40} />
                        </div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '1rem' }}>
                            Engine Interruption
                        </h1>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                            EcoVision encountered a temporary intelligence sync issue. Your safety and data access remain our priority.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2rem' }}
                        >
                            <RefreshCw size={20} /> Restart Intelligence Node
                        </button>
                    </motion.div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
