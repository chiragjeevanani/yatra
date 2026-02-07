import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, Clock, Map, Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DutyPreferencesScreen = () => {
    const navigate = useNavigate();

    const prefs = [
        { label: 'Preferred Shift', icon: Clock, value: 'Morning (08:00 - 16:00)' },
        { label: 'Favorite Routes', icon: Map, value: 'Route 124, 45B' },
        { label: 'Duty Notifications', icon: Bell, value: 'Push & SMS' },
    ];

    return (
        <div className="min-h-screen bg-background p-5 pt-12">
            <div className="flex items-center gap-4 mb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center active:scale-95 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black tracking-tighter">Duty Preferences</h1>
            </div>

            <div className="bg-driver-primary p-8 rounded-[2.5rem] text-driver-primary-foreground shadow-2xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Settings size={100} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-lg font-black tracking-tight mb-1">Work Configuration</h2>
                    <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Tailor your shift experience</p>
                </div>
            </div>

            <div className="space-y-4">
                {prefs.map((pref, i) => (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="w-full bg-card border border-border rounded-[2rem] p-6 flex items-center justify-between active:scale-98 transition-all"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground">
                                <pref.icon size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-black text-sm tracking-tight">{pref.label}</h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{pref.value}</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" />
                    </motion.button>
                ))}
            </div>

            <div className="mt-12 p-8 bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem] flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20 shrink-0">
                    <Clock size={20} />
                </div>
                <div>
                    <h4 className="font-black text-sm tracking-tight text-amber-600 mb-1">Request Changes</h4>
                    <p className="text-[10px] font-bold text-amber-700/60 leading-relaxed uppercase tracking-widest">
                        Submit shift change requests 48 hours in advance through the depot portal.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DutyPreferencesScreen;
