import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        title: "Live Tracking",
        description: "Track your bus in real-time and never miss your ride again.",
        icon: (
            <svg className="w-24 h-24 mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
            </svg>
        ),
        color: "bg-blue-500"
    },
    {
        title: "Route Navigation",
        description: "Find the fastest routes and easiest connections across the city.",
        icon: (
            <svg className="w-24 h-24 mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 20l-5-4 5-4" />
                <path d="M20 16H4" />
                <path d="M15 4l5 4-5 4" />
                <path d="M4 8h16" />
            </svg>
        ),
        color: "bg-emerald-500"
    },
    {
        title: "Save Favorites",
        description: "Your most used routes are just a single tap away.",
        icon: (
            <svg className="w-24 h-24 mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
        ),
        color: "bg-orange-500"
    }
];

const OnboardingScreen = () => {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    const nextSlide = () => {
        if (current < slides.length - 1) {
            setCurrent(current + 1);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className={`p-8 rounded-full ${slides[current].color} text-white mb-8 shadow-xl`}>
                            {slides[current].icon}
                        </div>
                        <h2 className="text-3xl font-bold text-foreground mb-4 font-sans tracking-tight">
                            {slides[current].title}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-xs leading-relaxed">
                            {slides[current].description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="p-10 flex flex-col items-center">
                <div className="flex gap-2 mb-10">
                    {slides.map((_, i) => (
                        <motion.div
                            key={i}
                            className={`h-2 rounded-full ${i === current ? 'w-8 bg-primary' : 'w-2 bg-muted'}`}
                            animate={{ width: i === current ? 32 : 8 }}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                >
                    {current === slides.length - 1 ? 'Get Started' : 'Continue'}
                </button>

                <button
                    onClick={() => navigate('/login')}
                    className="mt-4 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default OnboardingScreen;
