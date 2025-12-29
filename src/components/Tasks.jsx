import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, CheckCircle2, Circle } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

import { tasksAPI } from '../services/api';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    // Load tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await tasksAPI.getTasks();
                setTasks(response.data.tasks);
                setError(null);
            } catch (err) {
                setError('Failed to load tasks from server');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const taskData = {
                title: newTask,
                completed: false,
                priority: 'Medium',
                category: 'General'
            };

            const response = await tasksAPI.createTask(taskData);
            setTasks([response.data.task, ...tasks]);
            setNewTask('');
        } catch (err) {
            setError('Failed to add task');
        }
    };

    const toggleTask = async (id) => {
        const taskToToggle = tasks.find(t => t._id === id);
        if (!taskToToggle) return;

        try {
            const response = await tasksAPI.updateTask(id, {
                completed: !taskToToggle.completed
            });
            setTasks(tasks.map(task =>
                task._id === id ? response.data.task : task
            ));
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const deleteTask = async (id) => {
        try {
            await tasksAPI.deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    if (loading) {
        return <div className="tasks-container" style={{ padding: '20px', width: '100%', maxWidth: '900px', margin: '0 auto', color: 'var(--text-primary)' }}>Loading tasks...</div>;
    }

    if (error) {
        return <div className="tasks-container" style={{ padding: '20px', width: '100%', maxWidth: '900px', margin: '0 auto', color: 'var(--accent-danger)' }}>Error: {error}</div>;
    }

    return (
        <div className="tasks-container" style={{ padding: '20px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Tasks</h2>
                <form onSubmit={addTask}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 15px',
                            color: 'white',
                            outline: 'none',
                            marginRight: '10px'
                        }}
                    />
                    <button type="submit" className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={20} />
                        New Task
                    </button>
                </form>
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
                        key={task._id}
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
                            onClick={() => toggleTask(task._id)}
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
