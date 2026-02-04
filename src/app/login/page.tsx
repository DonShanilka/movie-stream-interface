'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await login(email, password);
            if (res.success) {
                router.push('/');
            } else {
                setError(res.message || 'Invalid email or password');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

            <div className="bg-neutral-900/40 backdrop-blur-xl p-10 rounded-3xl w-full max-w-md border border-white/5 shadow-2xl relative z-10 transition-transform duration-500 hover:scale-[1.01]">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tight">StreamBerry</h1>
                    <p className="text-gray-400 font-medium">Welcome back! Please enter your details</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-medium animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition placeholder:text-gray-600"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition placeholder:text-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold px-1">
                        <label className="flex items-center gap-2 text-gray-500 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded bg-black/40 border-white/10 checked:bg-yellow-400 transition" />
                            <span className="group-hover:text-gray-400">Remember me</span>
                        </label>
                        <a href="#" className="text-yellow-400 hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl shadow-lg shadow-yellow-400/10 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500 text-sm font-medium">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-yellow-400 hover:underline font-bold transition">
                        Sign Up
                    </Link>
                </p>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}
