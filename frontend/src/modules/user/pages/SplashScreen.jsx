import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding');
        }, 2500);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-blue-700 text-primary-foreground overflow-hidden">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
            >
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-6">
                    <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                    >
                        <path d="M7 13h10" />
                        <path d="M7 17h10" />
                        <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4" />
                        <path d="M20 7H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        <path d="M11 7v2" />
                        <path d="M13 7v2" />
                    </svg>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-black tracking-tighter mb-1">YATRA</h1>
                    <p className="text-blue-100 font-medium tracking-wide">SMART BUS NAVIGATION</p>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-12 flex flex-col items-center"
            >
                <div className="w-6 h-6 border-2 border-blue-200 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs text-blue-200 uppercase tracking-widest">Live Tracking Enabled</p>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
