import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import FocusMode from './components/FocusMode';
import Analytics from './components/Analytics';
import CalendarView from './components/CalendarView';
import LandingPage from './components/LandingPage';
import AuthPage from './components/Auth/AuthPage';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, loading } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'tasks':
        return <Tasks key="tasks" />;
      case 'calendar':
        return <CalendarView key="calendar" />;
      case 'focus':
        return <FocusMode key="focus" />;
      case 'analytics':
        return <Analytics key="analytics" />;
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '18px',
        color: 'var(--text-secondary)'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (!isStarted) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        >
          <LandingPage onStart={() => setIsStarted(true)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1, padding: '20px 40px', overflowY: 'auto', height: '100vh' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ width: '100%', height: '100%' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
