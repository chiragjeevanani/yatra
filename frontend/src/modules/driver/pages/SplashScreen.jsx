import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/driver/login');
        }, 2500);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] text-white overflow-hidden">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
            >
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6">
                    <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#1E3A8A]"
                    >
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7h2" />
                        <circle cx="7" cy="17" r="2" />
                        <path d="M9 17h6" />
                        <circle cx="17" cy="17" r="2" />
                        <path d="M11 8v5" />
                        <path d="M3 13h4" />
                    </svg>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-black tracking-tighter mb-1 uppercase">Yatra Driver</h1>
                    <p className="text-blue-100/70 font-bold text-xs uppercase tracking-[0.2em]">Pilot Control Center</p>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-16 flex flex-col items-center"
            >
                <div className="w-6 h-6 border-2 border-blue-200/30 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">System Initializing</p>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
