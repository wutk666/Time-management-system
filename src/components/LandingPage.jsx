import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

const LandingPage = ({ onStart }) => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: -1,
                    top: '-200px',
                    right: '-200px'
                }}
            />

            <div style={{ maxWidth: '1000px', textAlign: 'center', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src="/logo.png"
                        alt="Chronos Logo"
                        style={{ width: '100px', height: '100px', marginBottom: '30px', borderRadius: '24px', boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)' }}
                    />
                    <h1 style={{
                        fontSize: 'clamp(48px, 8vw, 84px)',
                        fontWeight: '900',
                        letterSpacing: '-2px',
                        marginBottom: '20px',
                        lineHeight: '1.1',
                        background: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.5))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Master Your Time.<br />Rule Your World.
                    </h1>
                    <p style={{
                        fontSize: '20px',
                        color: 'var(--text-secondary)',
                        marginBottom: '40px',
                        maxWidth: '600px',
                        marginInline: 'auto'
                    }}>
                        Experience the next generation of productivity with Chronos. Premium time management for those who demand excellence.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onStart}
                        className="primary-btn"
                        style={{
                            fontSize: '18px',
                            padding: '16px 40px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Enter the System
                        <ArrowRight size={20} />
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '30px',
                        marginTop: '100px'
                    }}
                >
                    {[
                        { icon: Zap, title: 'Hyper Focus', desc: 'Flow faster with Chronos.' },
                        { icon: Shield, title: 'Deep Privacy', desc: 'Your data stays local.' },
                        { icon: Sparkles, title: 'AI Insights', desc: 'Smarter daily reviews.' },
                    ].map((feature, idx) => (
                        <div key={idx} style={{ textAlign: 'left', padding: '20px' }}>
                            <feature.icon size={24} color="var(--accent-primary)" style={{ marginBottom: '15px' }} />
                            <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>{feature.title}</h4>
                            <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
