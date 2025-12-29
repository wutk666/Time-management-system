import React from 'react';
import { Sun, CheckCircle2, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const stats = [
        { label: 'Completed', value: '12', icon: CheckCircle2, color: 'var(--accent-success)' },
        { label: 'Focused Hours', value: '4.5', icon: Clock, color: 'var(--accent-primary)' },
        { label: 'Streak', value: '8 days', icon: Zap, color: 'var(--accent-warning)' },
    ];

    return (
        <div className="dashboard-container" style={{ padding: '20px', width: '100%' }}>
            <header style={{ marginBottom: '40px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
                >
                    <Sun size={32} color="var(--accent-warning)" />
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Good Afternoon, Explorer</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>You've completed 80% of your goals today.</p>
                    </div>
                </motion.div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass glass-hover"
                        style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
                            <stat.icon size={80} color={stat.color} />
                        </div>
                        <stat.icon size={24} color={stat.color} style={{ marginBottom: '15px' }} />
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '5px' }}>{stat.label}</div>
                        <div style={{ fontSize: '24px', fontWeight: '700' }}>{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                {/* Recent Tasks */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="glass"
                    style={{ padding: '24px' }}
                >
                    <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Active Projects</h3>
                    {[1, 2, 3].map((task) => (
                        <div key={task} className="glass-hover" style={{
                            padding: '16px',
                            borderRadius: '12px',
                            marginBottom: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            background: 'rgba(255,255,255,0.03)'
                        }}>
                            <div>
                                <div style={{ fontWeight: '600' }}>Design System Overhaul</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Product Strategy</div>
                            </div>
                            <div style={{ color: 'var(--accent-primary)', fontSize: '14px', fontWeight: '600' }}>In Progress</div>
                        </div>
                    ))}
                </motion.div>

                {/* Quick Focus */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="glass"
                    style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))' }}
                >
                    <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>Deep Work</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Ready to focus? Start a 25-minute session.</p>
                    <button className="primary-btn" style={{ width: '100%' }}>Start Timer</button>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
