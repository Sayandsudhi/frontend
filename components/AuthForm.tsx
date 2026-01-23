'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AuthFormProps {
    mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
    const isLogin = mode === 'login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? '/auth/login' : '/auth/signup';

        try {
            const { data } = await api.post(endpoint, { email, password });

            if (isLogin) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/dashboard');
            } else {
                // After signup, redirect to login page
                router.push('/login');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700">
            <div className="flex justify-between mb-8 relative bg-slate-900/50 rounded-full p-1">
                <motion.div
                    className="absolute top-1 bottom-1 w-[48%] bg-indigo-500 rounded-full z-0"
                    animate={{ x: isLogin ? 0 : '100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ left: '1%' }} // Adjust based on padding
                />
                <Link
                    href="/login"
                    className={`flex-1 relative z-10 py-2 text-sm font-medium text-center transition-colors duration-200 ${isLogin ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className={`flex-1 relative z-10 py-2 text-sm font-medium text-center transition-colors duration-200 ${!isLogin ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Sign Up
                </Link>
            </div>

            <AnimatePresence mode="wait">
                <motion.form
                    key={mode}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-center text-white mb-6">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                            placeholder="hello@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                                <span>Processing...</span>
                            </div>
                        ) : (isLogin ? 'Login' : 'Start Account')}
                    </motion.button>
                </motion.form>
            </AnimatePresence>
        </div>
    );
}
