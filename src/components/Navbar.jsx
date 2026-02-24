import { Link, useNavigate } from 'react-router-dom'
import { Wind, LogOut, LayoutDashboard, Calendar, BarChart, ShieldCheck, Download, Bell, BellRing } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useEnvironmentalData } from '../context/EnvironmentalContext'
import { useState, useEffect } from 'react'

const PWAControls = () => {
    const { requestNotificationPermission } = useEnvironmentalData()
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const [isInstalled, setIsInstalled] = useState(false)
    const [permissionStatus, setPermissionStatus] = useState(Notification.permission)

    useEffect(() => {
        // Handle installation prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault()
            setDeferredPrompt(e)
        })

        window.addEventListener('appinstalled', () => {
            setDeferredPrompt(null)
            setIsInstalled(true)
        })

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true)
        }
    }, [])

    const handleInstall = async () => {
        if (!deferredPrompt) return
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
            setDeferredPrompt(null)
        }
    }

    const handleEnableNotifications = async () => {
        const result = await requestNotificationPermission()
        setPermissionStatus(result)
    }

    return (
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            {deferredPrompt && !isInstalled && (
                <button
                    onClick={handleInstall}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px var(--primary-glow)'
                    }}
                >
                    <Download size={16} /> Download App
                </button>
            )}

            {permissionStatus !== 'granted' && (
                <button
                    onClick={handleEnableNotifications}
                    title="Enable Weather Alerts"
                    style={{
                        background: 'white',
                        color: 'var(--primary)',
                        border: '1px solid var(--primary-glow)',
                        padding: '0.5rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(14, 165, 233, 0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                    <Bell size={18} />
                </button>
            )}

            {permissionStatus === 'granted' && (
                <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', padding: '0.5rem' }} title="Alerts Enabled">
                    <BellRing size={18} />
                </div>
            )}
        </div>
    )
}

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar" style={{
            padding: '0.8rem 2.5rem',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--secondary)', textDecoration: 'none' }}>
                <div style={{
                    background: 'var(--primary)',
                    padding: '0.6rem',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px var(--primary-glow)'
                }}>
                    <Wind color="white" size={24} />
                </div>
                <div>
                    <div className="brand-font" style={{ lineHeight: 1, fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em' }}>CHARUSAT EcoVision</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--primary)', letterSpacing: '0.2em', fontWeight: '700', textTransform: 'uppercase' }}>Environmental Intelligence</div>
                </div>
            </Link>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LayoutDashboard size={18} /> Overview
                </Link>
                <Link to="/forecast" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={18} /> 7-Day Predict
                </Link>
                <Link to="/aqi" className="nav-link">Air Quality</Link>
                <Link to="/weather" className="nav-link">Temp & Heat</Link>

                {user?.role === 'admin' ? (
                    <>
                        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }}></div>
                        <Link to="/analytics" className="nav-link" style={{ color: 'var(--primary)', fontWeight: '700' }}>Impact</Link>
                        <Link to="/reports" className="nav-link">Archives</Link>
                    </>
                ) : (
                    <>
                        <Link to="/health" className="nav-link">Safety</Link>
                    </>
                )}

                <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    {/* Add App / Notifications Logic */}
                    <PWAControls />

                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--secondary)' }}>
                            {user?.student_id || 'SCHOLAR'}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>CHARUSAT Student</div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'white',
                            color: 'var(--danger)',
                            border: '1px solid #fee2e2',
                            padding: '0.6rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(244, 63, 94, 0.05)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#fff1f2'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
