import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (phone.length < 10) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/otp');
        }, 1500);
    };

    return (
        <div className="h-screen w-screen bg-background p-8 flex flex-col pt-20">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-black tracking-tight mb-2">Welcome Back!</h1>
                <p className="text-muted-foreground text-lg">Enter your phone number to start your journey.</p>
            </motion.div>

            <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSendOTP}
                className="space-y-6"
            >
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center gap-2 border-r pr-3">
                        <span className="text-sm font-bold">+91</span>
                    </div>
                    <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Phone Number"
                        className="w-full h-16 bg-muted/30 border-2 border-transparent focus:border-primary rounded-2xl pl-20 pr-4 text-xl font-bold tracking-widest placeholder:text-muted-foreground/50 transition-all outline-none"
                        required
                    />
                </div>

                <button
                    disabled={phone.length < 10 || isLoading}
                    className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-bold text-xl shadow-lg disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Get OTP <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </motion.form>

            <div className="mt-auto text-center">
                <p className="text-xs text-muted-foreground mb-8">
                    By continuing, you agree to our <span className="text-primary font-bold">Terms of Service</span> and <span className="text-primary font-bold">Privacy Policy</span>.
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
