import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, Activity, Bell, User } from 'lucide-react';

const tabs = [
    { path: '/driver/dashboard', icon: Home, label: 'Home' },
    { path: '/driver/tracking', icon: Map, label: 'Tracking' },
    { path: '/driver/status', icon: Activity, label: 'Status' },
    { path: '/driver/notifications', icon: Bell, label: 'Alerts' },
    { path: '/driver/profile', icon: User, label: 'Profile' },
];

const BottomNavigation = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-background/80 backdrop-blur-xl border-t border-border flex items-center justify-around px-2 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.path}
                    to={tab.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center w-full h-full relative transition-all duration-300 ${isActive ? 'text-driver-primary' : 'text-muted-foreground'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <motion.div
                                animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                                className="relative z-10"
                            >
                                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>
                            <span className={`text-[9px] font-black mt-1 uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                                {tab.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="driverActiveTab"
                                    className="absolute inset-x-2 inset-y-2 bg-driver-primary/10 rounded-2xl -z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </div>
    );
};

export default BottomNavigation;
