import { useState, useEffect } from 'react';
import { useEnvironmentalData } from '../context/EnvironmentalContext';

/**
 * useAqiAlert Hook
 * Manages the in-app AQI alert popup logic.
 * Monitors real-time environmental data and triggers the alert when thresholds are crossed.
 */
export const useAqiAlert = () => {
    const { aqi } = useEnvironmentalData();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [hasAlertedForCurrentCycle, setHasAlertedForCurrentCycle] = useState(false);
    const THRESHOLD = 150;

    useEffect(() => {
        // Trigger alert only when crossing the threshold and not already alerted
        if (aqi > THRESHOLD && !hasAlertedForCurrentCycle) {
            setIsPopupOpen(true);
            setHasAlertedForCurrentCycle(true);
        }

        // Reset the alert cycle if AQI drops significantly below threshold (hysteresis)
        // or if it's the first time data is loaded.
        if (aqi <= THRESHOLD - 10) {
            setHasAlertedForCurrentCycle(false);
        }
    }, [aqi, hasAlertedForCurrentCycle]);

    const closeAlert = () => {
        setIsPopupOpen(false);
    };

    return {
        isPopupOpen,
        closeAlert,
        aqiValue: aqi
    };
};
