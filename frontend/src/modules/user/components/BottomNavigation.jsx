import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Map, Bell, User } from 'lucide-react';

const tabs = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/track/123', icon: Map, label: 'Track' },
    { path: '/notifications', icon: Bell, label: 'Alerts' },
    { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNavigation = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-background/80 backdrop-blur-lg border-t border-border flex items-center justify-around px-2 z-50 transition-colors duration-200">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.path}
                    to={tab.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center w-full h-full relative transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                className="relative z-10"
                            >
                                <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>
                            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
                                {tab.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-x-4 inset-y-2 bg-primary/10 rounded-2xl -z-0"
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
