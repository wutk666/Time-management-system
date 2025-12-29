import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, CheckCircle2, Circle } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

const Tasks = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('chronos_tasks');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Build UI for Chronos', completed: false, priority: 'High', category: 'Dev' },
            { id: 2, title: 'Database schema design', completed: true, priority: 'Medium', category: 'Backend' },
            { id: 3, title: 'User interview synthesis', completed: false, priority: 'Low', category: 'Research' },
            { id: 4, title: 'Deploy to production', completed: false, priority: 'High', category: 'Ops' },
        ];
    });

    useEffect(() => {
        localStorage.setItem('chronos_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="tasks-container" style={{ padding: '20px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Tasks</h2>
                <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} />
                    New Task
                </button>
            </header>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <div className="glass" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '10px 15px', gap: '10px' }}>
                    <Search size={18} color="var(--text-dim)" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            outline: 'none',
                            width: '100%',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <button className="glass glass-hover" style={{ padding: '0 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            <div className="task-list">
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass glass-hover"
                        style={{
                            padding: '16px 20px',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            opacity: task.completed ? 0.6 : 1
                        }}
                    >
                        <button
                            onClick={() => toggleTask(task.id)}
                            style={{ background: 'transparent', color: task.completed ? 'var(--accent-success)' : 'var(--text-dim)' }}
                        >
                            {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </button>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontWeight: '500',
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? 'var(--text-dim)' : 'var(--text-primary)'
                            }}>
                                {task.title}
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                                <span style={{
                                    fontSize: '11px',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {task.category}
                                </span>
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    color: task.priority === 'High' ? 'var(--accent-danger)' : task.priority === 'Medium' ? 'var(--accent-warning)' : 'var(--accent-success)'
                                }}>
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                        <button style={{ background: 'transparent', color: 'var(--text-dim)' }}>
                            <MoreVertical size={20} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
