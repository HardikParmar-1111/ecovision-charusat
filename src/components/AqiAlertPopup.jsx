import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const DemoAlert = ({ isOpen, onClose, aqiValue }) => {
    useEffect(() => {
        if (isOpen) {
            // Play short alert sound once
            const alertSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            alertSound.play().catch(e => console.log('Sound blocked by browser policy:', e));
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    background: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(8px)'
                }}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="card"
                        style={{
                            width: '90%',
                            maxWidth: '450px',
                            padding: '2.5rem',
                            textAlign: 'center',
                            border: '1px solid var(--danger)',
                            background: 'rgba(255, 255, 255, 0.95)',
                            boxShadow: '0 25px 50px -12px rgba(244, 63, 94, 0.25)'
                        }}
                    >
                        <div style={{
                            background: 'rgba(244, 63, 94, 0.1)',
                            color: 'var(--danger)',
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        }}>
                            <AlertTriangle size={32} />
                        </div>

                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            color: 'var(--secondary)',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            ⚠️ Air Quality Alert
                        </h2>

                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-main)',
                            lineHeight: '1.6',
                            marginBottom: '2rem'
                        }}>
                            Air quality is unhealthy (AQI: <span style={{ fontWeight: '800', color: 'var(--danger)' }}>{aqiValue}</span>).<br />
                            <strong>Avoid outdoor activities.</strong>
                        </p>

                        <button
                            onClick={onClose}
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--danger)',
                                boxShadow: '0 8px 16px rgba(244, 63, 94, 0.3)'
                            }}
                        >
                            Understood
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DemoAlert;
