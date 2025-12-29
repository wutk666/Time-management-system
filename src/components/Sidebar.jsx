import { LayoutDashboard, CheckSquare, Timer, BarChart3, Settings, LogOut, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
        { id: 'calendar', icon: Calendar, label: 'Calendar' },
        { id: 'focus', icon: Timer, label: 'Focus Mode' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ];

    return (
        <aside className="sidebar glass" style={{
            width: '260px',
            height: 'calc(100vh - 40px)',
            margin: '20px',
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 20px',
            position: 'sticky',
            top: '20px'
        }}>
            <div className="logo-section" style={{ marginBottom: '40px', padding: '0 10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/logo.png" alt="Chronos Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px'
                }}>
                    Chronos<span style={{ color: 'var(--accent-primary)', WebkitTextFillColor: 'initial' }}>.</span>
                </h1>
            </div>

            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(item.id)}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 16px',
                            marginBottom: '8px',
                            borderRadius: '12px',
                            background: activeTab === item.id ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                            color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            border: 'none',
                            textAlign: 'left',
                            transition: 'var(--transition-smooth)',
                            cursor: 'pointer'
                        }}
                        className={activeTab === item.id ? '' : 'glass-hover'}
                    >
                        <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span style={{ fontWeight: activeTab === item.id ? '600' : '500' }}>{item.label}</span>
                    </motion.button>
                ))}
            </nav>

            <div className="footer-section" style={{ marginTop: 'auto' }}>
                <button style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'transparent',
                    color: 'var(--text-dim)',
                    border: 'none',
                    cursor: 'pointer'
                }} className="glass-hover">
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
