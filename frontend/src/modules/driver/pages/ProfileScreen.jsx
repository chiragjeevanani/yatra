import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Phone, MapPin, LogOut, ChevronRight, Settings, Moon, HelpCircle } from 'lucide-react';
import { useDriver } from '../contexts/DriverContext';
import { useTheme } from '../../user/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { cn } from '../lib/utils';

const ProfileScreen = () => {
    const { driver, logout } = useDriver();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/driver/login');
    };

    const sections = [
        { label: 'Security & Access', icon: Shield, onClick: () => navigate('/driver/profile/security') },
        { label: 'Duty Preferences', icon: Settings, onClick: () => navigate('/driver/profile/preferences') },
        {
            label: 'Dark Mode',
            icon: Moon,
            toggle: true,
            active: theme === 'dark',
            onClick: toggleTheme
        },
        { label: 'Help & Support', icon: HelpCircle, onClick: () => navigate('/driver/profile/support') },
    ];

    return (
        <div className="min-h-screen bg-background pb-28">
            <div className="bg-[#1E3A8A] p-8 pt-12 rounded-b-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <User size={120} />
                </div>

                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-24 h-24 rounded-[2rem] bg-white p-1 shadow-2xl skew-y-1">
                        <div className="w-full h-full rounded-[1.8rem] bg-blue-100 flex items-center justify-center overflow-hidden">
                            <img src={driver?.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter mb-1">{driver?.name}</h1>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {driver?.employeeId}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5">
                        <p className="text-[8px] font-bold text-blue-200 uppercase tracking-widest mb-1">Assigned Depot</p>
                        <p className="text-xs font-black">{driver?.depot}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5">
                        <p className="text-[8px] font-bold text-blue-200 uppercase tracking-widest mb-1">Total Trips</p>
                        <p className="text-xs font-black">1,492 Trips</p>
                    </div>
                </div>
            </div>

            <div className="p-5 mt-4 space-y-3">
                {sections.map((section, i) => (
                    <button
                        key={i}
                        onClick={section.onClick}
                        className="w-full h-18 bg-card border border-border rounded-3xl p-5 flex items-center justify-between active:scale-98 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                                <section.icon size={20} className={section.active ? 'text-primary' : ''} />
                            </div>
                            <span className="font-bold text-sm tracking-tight">{section.label}</span>
                        </div>
                        {section.toggle ? (
                            <div className={cn(
                                "w-10 h-6 rounded-full relative p-1 transition-colors duration-200",
                                section.active ? "bg-primary" : "bg-muted"
                            )}>
                                <motion.div
                                    animate={{ x: section.active ? 16 : 0 }}
                                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                                />
                            </div>
                        ) : (
                            <ChevronRight size={18} className="text-muted-foreground" />
                        )}
                    </button>
                ))}

                <button
                    onClick={handleLogout}
                    className="w-full h-18 bg-red-500/10 border border-red-500/20 rounded-3xl p-5 flex items-center justify-between active:scale-98 transition-all group mt-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                            <LogOut size={20} />
                        </div>
                        <span className="font-black text-sm tracking-tighter text-red-500 uppercase italic">Logout System</span>
                    </div>
                    <ChevronRight size={18} className="text-red-300" />
                </button>
            </div>

            <div className="text-center mt-8 px-8">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-loose">
                    Yatra Driver Console v2.4.0<br />
                    Powered by Yatra Infrastructure Solutions
                </p>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default ProfileScreen;
