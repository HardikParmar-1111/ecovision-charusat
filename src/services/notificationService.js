/**
 * EcoVision Notification Service
 * Manages browser push notifications and campus safety alert triggers.
 */

class NotificationService {
    constructor() {
        this.lastNotified = {
            aqi: 0,
            temp: 0,
            rain: 0
        };
        this.COOLDOWN = 3600000; // 1 hour cooldown between same-type alerts

        // Alert Sound
        this.alertSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); // Professional notification chime
    }

    async requestPermission() {
        if (!('Notification' in window)) {
            console.warn('This browser does not support environmental notifications.');
            return 'unsupported';
        }

        const permission = await Notification.requestPermission();
        return permission;
    }

    getPermissionStatus() {
        if (!('Notification' in window)) return 'unsupported';
        return Notification.permission;
    }

    sendAlert(title, body, type) {
        if (Notification.permission !== 'granted') return;

        const now = Date.now();
        if (now - this.lastNotified[type] < this.COOLDOWN) return;

        this.lastNotified[type] = now;

        const options = {
            body,
            icon: '/vite.svg',
            badge: '/vite.svg',
            vibrate: [200, 100, 200],
            tag: `ecovision-alert-${type}`,
            renotify: true,
            data: { url: this.getDeepLink(type) }
        };

        // Play sound for foreground alerts
        try {
            this.alertSound.play().catch(e => { });
        } catch (e) {
            // Silently fail if audio restricted
        }

        // Try to send via Service Worker for background capability
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(`EcoVision: ${title}`, options);
            });
        } else {
            new Notification(`EcoVision: ${title}`, options);
        }
    }

    getDeepLink(type) {
        switch (type) {
            case 'aqi': return '/aqi';
            case 'temp': return '/weather';
            case 'rain': return '/forecast';
            default: return '/';
        }
    }

    checkThresholds(data) {
        // AQI High Alert
        if (data.aqi > 150) {
            this.sendAlert(
                'High AQI Alert',
                `Current AQI is ${data.aqi} (${data.aqiCategory}). Advise avoiding outdoor activities.`,
                'aqi'
            );
        }

        // Heatwave Alert
        if (data.temp > 40) {
            this.sendAlert(
                'Heatwave Warning',
                `Extreme temperature of ${data.temp}°C detected. Stay hydrated and use cooling areas.`,
                'temp'
            );
        }

        // Rain Alert
        const condition = data.condition?.toLowerCase() || '';
        if (condition.includes('rain') || condition.includes('thunderstorm')) {
            this.sendAlert(
                'Heavy Rain Advisory',
                `Persistent precipitation detected. Monitor campus drainage and avoid ground-based events.`,
                'rain'
            );
        }
    }
}

export const notificationService = new NotificationService();
