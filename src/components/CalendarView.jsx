import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarView = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Simple mock data for calendar days
    const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className="calendar-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{month} {year}</h2>
                    <p style={{ color: 'var(--text-dim)' }}>Scheduling your deep work sessions.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="glass glass-hover" style={{ padding: '8px' }}><ChevronLeft size={20} /></button>
                    <button className="glass glass-hover" style={{ padding: '8px' }}><ChevronRight size={20} /></button>
                    <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> Add Event
                    </button>
                </div>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '10px',
                marginBottom: '10px'
            }}>
                {days.map(day => (
                    <div key={day} style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--text-dim)',
                        padding: '10px'
                    }}>
                        {day}
                    </div>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '10px'
            }}>
                {calendarDays.map(d => (
                    <motion.div
                        key={d}
                        whileHover={{ scale: 1.02 }}
                        className="glass glass-hover"
                        style={{
                            height: '120px',
                            padding: '12px',
                            position: 'relative',
                            background: d === 29 ? 'rgba(139, 92, 246, 0.1)' : 'var(--card-bg)',
                            borderColor: d === 29 ? 'var(--accent-primary)' : 'var(--glass-border)'
                        }}
                    >
                        <span style={{
                            fontSize: '14px',
                            fontWeight: d === 29 ? '700' : '500',
                            color: d === 29 ? 'var(--accent-primary)' : 'var(--text-secondary)'
                        }}>
                            {d}
                        </span>
                        {d === 29 && (
                            <div style={{
                                marginTop: '10px',
                                fontSize: '10px',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                fontWeight: '600'
                            }}>
                                Chronos Launch
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;
