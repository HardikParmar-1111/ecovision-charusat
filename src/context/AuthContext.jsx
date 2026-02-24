import { createContext, useContext, useState, useEffect } from 'react'
import { logVisit } from '../services/userService'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Load identification from LocalStorage
        const savedUser = localStorage.getItem('ecovision_user')
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch (e) {
                console.error('Failed to parse saved user')
                localStorage.removeItem('ecovision_user')
            }
        }
        setLoading(false)
    }, [])

    const login = async (studentId, fullName) => {
        const userData = {
            student_id: studentId.toUpperCase(),
            student_name: fullName,
            loginTime: new Date().toISOString()
        }

        // Save to state and persistent storage
        setUser(userData)
        localStorage.setItem('ecovision_user', JSON.stringify(userData))

        // Background: Log visit to Supabase (non-blocking)
        logVisit(studentId).catch(err => console.warn('Metric logging failed:', err))

        return userData
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('ecovision_user')
    }

    const value = { user, login, logout, loading, signup: login } // Alias signup to login for compatibility

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
