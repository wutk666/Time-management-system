import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Register = ({ onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await register(name, email, password);

        if (!result.success) {
            setError(result.message);
            setLoading(false);
        }
        // If successful, AuthContext will handle the redirect
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass"
            style={{
                width: '100%',
                maxWidth: '450px',
                padding: '40px',
                margin: '0 auto'
            }}
        >
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '10px' }}>
                Create Account
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                Join Chronos and master your time
            </p>

            {error && (
                <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <AlertCircle size={18} color="var(--accent-danger)" />
                    <span style={{ color: 'var(--accent-danger)', fontSize: '14px' }}>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                        Name
                    </label>
                    <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '10px' }}>
                        <User size={18} color="var(--text-dim)" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
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
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                        Email
                    </label>
                    <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '10px' }}>
                        <Mail size={18} color="var(--text-dim)" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
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
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                        Password
                    </label>
                    <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '10px' }}>
                        <Lock size={18} color="var(--text-dim)" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
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
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="primary-btn"
                    style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        opacity: loading ? 0.6 : 1
                    }}
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                    {!loading && <ArrowRight size={20} />}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                Already have an account?{' '}
                <button
                    onClick={onSwitchToLogin}
                    style={{
                        background: 'none',
                        color: 'var(--accent-primary)',
                        fontWeight: '600',
                        textDecoration: 'underline'
                    }}
                >
                    Sign in
                </button>
            </p>
        </motion.div>
    );
};

export default Register;
