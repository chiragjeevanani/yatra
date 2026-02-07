import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Shield,
    Bell,
    Monitor,
    Lock,
    Save,
    Camera,
    Check,
    Globe,
    Database,
    Cpu,
    Zap,
    LogOut
} from 'lucide-react';
import { useAdmin } from '../contexts/useAdmin';
import { cn } from '../lib/utils';

const SettingsScreen = () => {
    const { admin } = useAdmin();
    const [activeSection, setActiveSection] = useState('Profile');

    const sections = [
        { name: 'Profile', icon: User },
        { name: 'Security', icon: Shield },
        { name: 'Notifications', icon: Bell },
        { name: 'System', icon: Cpu },
        { name: 'Preferences', icon: Monitor },
    ];

    return (
        <div className="p-8 space-y-8 pb-12 h-[calc(100vh-80px)] flex flex-col oveflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground">Control Center</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-[10px]">Configure system parameters and admin identity</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-12 px-8 rounded-2xl bg-[#1E3A8A] text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-xl shadow-[#1E3A8A]/20 active:scale-95">
                        <Save size={18} /> Save All Changes
                    </button>
                </div>
            </div>

            <div className="flex gap-8 flex-1 overflow-hidden">
                {/* Side Navigation */}
                <div className="w-64 space-y-2 shrink-0 overflow-y-auto no-scrollbar pb-6">
                    {sections.map((section) => (
                        <button
                            key={section.name}
                            onClick={() => setActiveSection(section.name)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeSection === section.name
                                    ? "bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/20"
                                    : "bg-card border border-transparent text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <section.icon size={18} />
                            {section.name}
                        </button>
                    ))}
                    <div className="pt-6 border-t border-border mt-6">
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all">
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Settings Form Area */}
                <div className="flex-1 bg-card border border-border rounded-[2.5rem] shadow-sm overflow-y-auto no-scrollbar p-12">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl space-y-12"
                    >
                        {/* Profile Section */}
                        {activeSection === 'Profile' && (
                            <div className="space-y-10">
                                <div className="flex flex-col md:flex-row md:items-center gap-8">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-[3.5rem] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] p-1 shadow-2xl overflow-hidden">
                                            <img
                                                src={admin?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"}
                                                className="w-full h-full rounded-[3.3rem] bg-white object-cover"
                                                alt="Avatar"
                                            />
                                        </div>
                                        <button className="absolute bottom-0 right-0 w-10 h-10 rounded-xl bg-white shadow-xl border border-border flex items-center justify-center text-[#1E3A8A] hover:scale-110 transition-all active:scale-95">
                                            <Camera size={18} />
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black tracking-tighter">Identity Details</h2>
                                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Update your administrative profile markers</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue={admin?.name || "Transit Administrator"}
                                            className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-6 text-sm font-bold outline-none focus:border-[#1E3A8A] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue="admin@yatra-transit.com"
                                            className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-6 text-sm font-bold outline-none focus:border-[#1E3A8A] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2 lg:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Public Admin ID</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                disabled
                                                defaultValue="ADMIN-SYS-992-PX"
                                                className="w-full h-14 bg-muted/20 border border-border rounded-2xl px-6 text-sm font-bold text-muted-foreground"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Verified Badge</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* System Section */}
                        {activeSection === 'System' && (
                            <div className="space-y-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[2rem] bg-muted flex items-center justify-center text-[#1E3A8A] shadow-inner">
                                        <Cpu size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tighter">System Health</h2>
                                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Monitor system-wide services and performance</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: 'Real-time Tracking Node', status: 'Operational', icon: Zap },
                                        { label: 'Cloud Storage Sync', status: 'Active', icon: Globe },
                                        { label: 'Database Integrity', status: 'Secured', icon: Database },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-muted/30 rounded-[2rem] border border-border/50 group hover:border-[#1E3A8A] transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1E3A8A] group-hover:scale-110 transition-transform">
                                                    <item.icon size={22} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black">{item.label}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Uptime 99.9%</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest italic">
                                                <Check size={14} /> {item.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other sections */}
                        {activeSection !== 'Profile' && activeSection !== 'System' && (
                            <div className="h-64 flex flex-col items-center justify-center text-center py-20 bg-muted/10 rounded-[2.5rem] border-2 border-dashed border-border">
                                <section.icon size={48} className="text-muted-foreground mb-4" />
                                <h3 className="text-xl font-black tracking-tighter mb-1 uppercase tracking-widest text-[14px]">{activeSection} Module</h3>
                                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest text-[10px]">Management controls for {activeSection} arriving soon</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;
