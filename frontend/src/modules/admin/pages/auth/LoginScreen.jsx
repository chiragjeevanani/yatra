import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Lock,
    Mail,
    ArrowRight,
    Bus,
    ShieldCheck,
    Zap,
    AlertCircle
} from 'lucide-react';
import { useAdmin } from '../../contexts/useAdmin';
import { cn } from '../../lib/utils';

const LoginScreen = () => {
    const { login } = useAdmin();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Mock login delay
        setTimeout(() => {
            const success = login(credentials.email, credentials.password);
            if (success) {
                navigate('/admin/dashboard');
            } else {
                setError('Invalid administrative credentials. Please check your access key or keyphrase.');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1E3A8A]/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[1200px] grid lg:grid-cols-2 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative z-10"
            >
                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full rotate-12 scale-150">
                            <Bus size={600} className="text-white/10" />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#1E3A8A] shadow-2xl">
                                <Bus size={28} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">YATRA <span className="text-blue-400">ADMIN</span></span>
                        </div>

                        <h1 className="text-6xl font-black tracking-tighter text-white leading-[0.9] mb-8">
                            Control the <span className="text-blue-400">Pulse</span> of the City.
                        </h1>
                        <p className="text-blue-100/60 text-lg font-bold uppercase tracking-[0.2em] mb-12">Fleet Management & Transit Intelligence</p>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10">
                            <ShieldCheck className="text-blue-400 mb-3" size={24} />
                            <h4 className="text-white font-black text-sm uppercase mb-1">Secure Access</h4>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Encrypted Session</p>
                        </div>
                        <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10">
                            <Zap className="text-blue-400 mb-3" size={24} />
                            <h4 className="text-white font-black text-sm uppercase mb-1">Real-time Sync</h4>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Active nodes: 124</p>
                        </div>
                    </div>
                </div>

                {/* Login Form Side */}
                <div className="p-12 lg:p-24 flex flex-col justify-center">
                    <div className="mb-12">
                        <h2 className="text-3xl font-black tracking-tighter text-white mb-2">Initialize Session</h2>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Enter administrative credentials to proceed</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Access Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    placeholder="admin@yatra-transit.com"
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    className="w-full h-16 bg-slate-800/50 border border-white/5 rounded-2xl pl-16 pr-6 text-white text-sm font-bold outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Secure Passkey</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••••••"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    className="w-full h-16 bg-slate-800/50 border border-white/5 rounded-2xl pl-16 pr-6 text-white text-sm font-bold outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-6 h-6 rounded-lg border-2 border-slate-700 bg-slate-800 group-hover:border-blue-500 transition-all flex items-center justify-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Remember Station</span>
                            </label>
                            <button type="button" className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">Recover Access</button>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500"
                            >
                                <AlertCircle size={18} />
                                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Login failed: {error}</p>
                            </motion.div>
                        )}

                        <button
                            disabled={isLoading}
                            className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_-12px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Initialize Dashboard <ArrowRight size={20} /></>
                            )}
                        </button>

                        <div className="pt-8 text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                Protected by Yatra System Security Protocol v4.0
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginScreen;
