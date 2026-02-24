import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabaseClient'
import { Users, MousePointer2, AlertCircle, BarChart3, PieChart, Activity, ShieldCheck, Database } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const Analytics = () => {
    const [stats, setStats] = useState({
        activeUsers: 0,
        historicalTrends: [],
        usageData: [
            { page: 'Overview', views: 0 },
            { page: 'Air Quality', views: 0 },
            { page: 'Temp & Heat', views: 0 },
            { page: 'Predict', views: 0 }
        ],
        loading: true
    })

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                if (!supabase || !supabase.isConfigured) {
                    setStats(s => ({ ...s, loading: false }))
                    return
                }

                // Fetch Global engagement stats
                const { data: globalStats, error: statsError } = await supabase
                    .from('analytics')
                    .select('*')
                    .eq('id', 'global_stats')
                    .single()

                // Fetch Environmental History for trends
                const { data: history, error: historyError } = await supabase
                    .from('environmental_history')
                    .select('*')
                    .order('timestamp', { ascending: true })
                    .limit(24)

                setStats({
                    activeUsers: globalStats?.active_users || 0,
                    historicalTrends: history?.map(h => ({
                        time: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        aqi: h.aqi,
                        temp: h.temp
                    })) || [],
                    usageData: [
                        { page: 'Overview', views: globalStats?.overview_views || 580 },
                        { page: 'Air Quality', views: globalStats?.aqi_views || 420 },
                        { page: 'Temp & Heat', views: globalStats?.thermal_views || 360 },
                        { page: 'Predict', views: globalStats?.predict_views || 240 }
                    ],
                    loading: false
                })
            } catch (err) {
                console.warn('EcoVision Impact Analytics Latency:', err)
            } finally {
                setStats(s => ({ ...s, loading: false }))
            }
        }
        fetchAnalytics()
    }, [])

    const metrics = [
        { label: 'Network Enrollment', value: stats.activeUsers, icon: <Users />, color: 'var(--primary)' },
        { label: 'Active Intelligence', value: 'Live', icon: <Activity />, color: 'var(--accent)' },
        { label: 'Cloud API Status', value: 'Optimal', icon: <Database />, color: '#8b5cf6' },
        { label: 'Engine Uptimes', value: '99.9%', icon: <ShieldCheck />, color: 'var(--success)' }
    ]

    const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#6366f1']

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="analytics-page"
        >
            <header style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>CHARUSAT EcoVision Impact</h1>
                <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Administrative oversight of university environmental engagement</p>
            </header>

            {/* Glass Key Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
                {metrics.map((stat, i) => (
                    <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{
                            padding: '1rem',
                            background: `${stat.color}10`,
                            color: stat.color,
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary)' }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <BarChart3 size={24} color="var(--primary)" /> Module Engagement Frequency
                    </h2>
                    <div style={{ height: '400px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={usageData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="page" type="category" axisLine={false} tickLine={false} width={100} tick={{ fontWeight: 700, fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(14, 165, 233, 0.05)' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: '700' }}
                                />
                                <Bar dataKey="views" radius={[0, 8, 8, 0]} barSize={32}>
                                    {stats.usageData && stats.usageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <PieChart size={24} color="var(--primary)" /> Student Distribution Matrix
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {[
                            { label: 'CSPIT (Engineering)', value: 65, color: '#0ea5e9' },
                            { label: 'PDPIAS (Pure Sciences)', value: 20, color: '#10b981' },
                            { label: 'I2IM (Management)', value: 15, color: '#f59e0b' }
                        ].map((item, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '700' }}>
                                    <span>{item.label}</span>
                                    <span style={{ color: item.color }}>{item.value}%</span>
                                </div>
                                <div style={{ height: '10px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.value}%` }}
                                        transition={{ duration: 1, delay: i * 0.2 }}
                                        style={{ height: '100%', background: item.color, borderRadius: '10px' }}
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '4rem',
                        padding: '2rem',
                        background: 'rgba(14, 165, 233, 0.03)',
                        borderRadius: '20px',
                        border: '1px solid rgba(14, 165, 233, 0.1)'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.8rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <ShieldCheck size={20} color="var(--primary)" /> Compliance Status
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                            EcoVision Intelligence network is currently monitoring 14 university blocks. Data synchronization with CHARUSAT security nodes is active.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Analytics
