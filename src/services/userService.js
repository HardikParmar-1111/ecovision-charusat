import { supabase } from '../lib/supabaseClient'

/**
 * EcoVision User Metric Service
 * Tracks unique visits to the campus intelligence dashboard.
 */

export async function getTotalUsers() {
    try {
        const { count, error } = await supabase
            .from('visits')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;
        return count || 0;
    } catch (error) {
        console.warn('Analytics Hub Latency:', error);
        return 0;
    }
}

/**
 * Log a visit for identification
 * Wrapped in try/catch to ensure app stability even if Supabase fails
 */
export async function logVisit(studentId) {
    try {
        // Simple insert. RLS must allow public inserts.
        const { error } = await supabase
            .from('visits')
            .insert([{ student_id: studentId.toUpperCase() }]);

        if (error) throw error;
    } catch (error) {
        // Silent fail to maintain UI stability
        console.warn('Visit telemetry bypassed:', error.message);
    }
}

// Deprecated: Profiles are now handled via LocalStorage in AuthContext
export const createUserProfile = async () => { };
export const getUserProfile = async () => null;
