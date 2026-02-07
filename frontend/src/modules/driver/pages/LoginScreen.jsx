import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (phone.length < 10) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/driver/otp', { state: { phone } });
        }, 1500);
    };

    return (
        <div className="h-screen w-screen bg-background p-8 flex flex-col justify-between">
            <div className="pt-12">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 bg-driver-primary rounded-2xl flex items-center justify-center text-driver-primary-foreground shadow-xl shadow-driver-primary/20 mb-8"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7h2" />
                        <circle cx="7" cy="17" r="2" />
                        <circle cx="17" cy="17" r="2" />
                    </svg>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-4xl font-black tracking-tighter mb-2 text-driver-primary">Pilot Login</h1>
                    <p className="text-muted-foreground font-bold text-sm tracking-tight leading-relaxed">
                        Enter your registered mobile number to access your trip dashboard.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleLogin}
                    className="mt-12 space-y-6"
                >
                    <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Phone size={20} />
                        </div>
                        <input
                            type="tel"
                            maxLength={10}
                            placeholder="Mobile Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-16 bg-muted/50 border-2 border-transparent focus:border-driver-primary rounded-2xl pl-14 pr-6 text-lg font-bold outline-none transition-all placeholder:text-muted-foreground/50"
                        />
                    </div>

                    <button
                        disabled={phone.length < 10 || isLoading}
                        className="w-full h-16 bg-driver-primary text-driver-primary-foreground rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                NEXT STEP <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </motion.form>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-2 text-muted-foreground"
            >
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secured Driver Access</span>
            </motion.div>
        </div>
    );
};

export default LoginScreen;
