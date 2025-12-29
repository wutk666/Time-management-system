import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FocusMode = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, short, long

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Notify user
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : mode === 'short' ? 5 * 60 : 15 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : newMode === 'short' ? 5 * 60 : 15 * 60);
    };

    return (
        <div className="focus-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '40px'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: '60px 40px',
                    textAlign: 'center',
                    position: 'relative'
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '40px'
                }}>
                    {[
                        { id: 'focus', label: 'Focus', icon: Brain },
                        { id: 'short', label: 'Short Break', icon: Coffee },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => switchMode(m.id)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                background: mode === m.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                color: mode === m.id ? 'white' : 'var(--text-secondary)',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <m.icon size={16} />
                            {m.label}
                        </button>
                    ))}
                </div>

                <motion.div
                    key={timeLeft}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        fontSize: '100px',
                        fontWeight: '800',
                        fontFamily: 'Inter',
                        marginBottom: '40px',
                        letterSpacing: '-4px',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-dim)'
                    }}
                >
                    {formatTime(timeLeft)}
                </motion.div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button
                        onClick={toggleTimer}
                        className="primary-btn"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="glass glass-hover"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--glass-border)'
                        }}
                    >
                        <RotateCcw size={28} color="var(--text-secondary)" />
                    </button>
                </div>

                {isActive && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ marginTop: '30px', color: 'var(--accent-primary)', fontWeight: '500' }}
                    >
                        Time to concentrate. Deep work in progress.
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default FocusMode;
