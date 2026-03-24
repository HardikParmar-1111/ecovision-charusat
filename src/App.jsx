import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AQI from './pages/AQI'
import Weather from './pages/Weather'
import Forecast from './pages/Forecast'
import Alerts from './pages/Alerts'
import Trends from './pages/Trends'
import Health from './pages/Health'
import Awareness from './pages/Awareness'
import CarbonFootprint from './pages/CarbonFootprint'
import Feedback from './pages/Feedback'
import Reports from './pages/Reports'
import About from './pages/About'
import Login from './pages/Login'
import Analytics from './pages/Admin/Analytics'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { EnvironmentalProvider } from './context/EnvironmentalContext'
import { AuthProvider, useAuth } from './context/AuthContext'
<h1>DEPLOY VERSION: 24-MAR-TEST</h1>

const AuthCheck = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return null
    return user ? children : <Navigate to="/login" replace />
}

const Layout = ({ children }) => {
    return (
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '2.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

import ErrorBoundary from './components/ErrorBoundary'

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <EnvironmentalProvider>
                    <Router>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={
                                <AuthCheck>
                                    <Layout>
                                        <Routes>
                                            <Route path="/" element={<Dashboard />} />
                                            <Route path="/aqi" element={<AQI />} />
                                            <Route path="/weather" element={<Weather />} />
                                            <Route path="/forecast" element={<Forecast />} />
                                            <Route path="/alerts" element={<Alerts />} />
                                            <Route path="/trends" element={<Trends />} />
                                            <Route path="/health" element={<Health />} />
                                            <Route path="/awareness" element={<Awareness />} />
                                            <Route path="/carbon-footprint" element={<CarbonFootprint />} />
                                            <Route path="/feedback" element={<Feedback />} />
                                            <Route path="/about" element={<About />} />
                                            <Route path="/reports" element={<Reports />} />
                                            <Route path="/analytics" element={<Analytics />} />
                                            <Route path="*" element={<Navigate to="/" replace />} />
                                        </Routes>
                                    </Layout>
                                </AuthCheck>
                            } />
                        </Routes>
                    </Router>
                </EnvironmentalProvider>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export default App
