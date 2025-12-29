import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Mon', focus: 4, tasks: 5 },
    { name: 'Tue', focus: 6, tasks: 8 },
    { name: 'Wed', focus: 3, tasks: 4 },
    { name: 'Thu', focus: 8, tasks: 12 },
    { name: 'Fri', focus: 5, tasks: 7 },
    { name: 'Sat', focus: 2, tasks: 3 },
    { name: 'Sun', focus: 1, tasks: 2 },
];

const Analytics = () => {
    return (
        <div className="analytics-container" style={{ padding: '20px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Analytics</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Track your productivity peaks and trends.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass"
                    style={{ padding: '24px', height: '400px' }}
                >
                    <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Focus Hours</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{ background: 'var(--sidebar-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}
                                itemStyle={{ color: 'white' }}
                            />
                            <Area type="monotone" dataKey="focus" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorFocus)" strokeWidth={3} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} dy={10} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass"
                    style={{ padding: '24px', height: '400px' }}
                >
                    <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Tasks Completed</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data}>
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ background: 'var(--sidebar-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}
                            />
                            <Bar dataKey="tasks" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} dy={10} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass"
                style={{ padding: '24px' }}
            >
                <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>Weekly Summary</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    You were most productive on **Thursday**. Your focus sessions increased by **15%** compared to last week.
                </p>
            </motion.div>
        </div>
    );
};

export default Analytics;
