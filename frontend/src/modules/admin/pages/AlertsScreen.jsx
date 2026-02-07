import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle,
    AlertCircle,
    Info,
    MessageSquare,
    Bell,
    Search,
    Filter,
    CheckCircle2,
    MoreVertical,
    History,
    Megaphone,
    ArrowRight,
    Clock
} from 'lucide-react';
import { MOCK_ALERTS } from '../lib/mockData';
import { cn } from '../lib/utils';

const AlertsScreen = () => {
    const [activeTab, setActiveTab] = useState('All Alerts');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['All Alerts', 'Emergency', 'System', 'Messages'];

    return (
        <div className="p-8 space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground text-red-600">Incident Control</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-[10px]">Real-time emergency monitoring and dispatch</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-12 px-6 rounded-2xl bg-card border border-border flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-muted transition-all active:scale-95 shadow-sm">
                        <History size={18} /> Archive
                    </button>
                    <button className="h-12 px-6 rounded-2xl bg-red-600 text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95">
                        <Megaphone size={18} /> Broadcast Alert
                    </button>
                </div>
            </div>

            {/* Quick Actions & Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                                activeTab === tab
                                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                                    : "bg-card border-transparent text-muted-foreground hover:border-border"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                        type="text"
                        placeholder="Search incidents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 bg-card border border-border rounded-2xl pl-12 pr-4 text-xs font-bold outline-none focus:border-red-600 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Alert Cards Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {MOCK_ALERTS.map((alert, i) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                            "bg-card border-l-8 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden",
                            alert.priority === 'high' ? "border-red-600" : "border-amber-500"
                        )}
                    >
                        {/* Status Icon Decoration */}
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                            {alert.priority === 'high' ? <AlertTriangle size={80} /> : <AlertCircle size={80} />}
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                    alert.priority === 'high' ? "bg-red-500/10 text-red-600" : "bg-amber-500/10 text-amber-600"
                                )}>
                                    {alert.priority} priority
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest">
                                    <Clock size={14} /> {alert.time}
                                </span>
                            </div>

                            <h3 className="text-xl font-black tracking-tighter mb-2 group-hover:text-red-700 transition-colors">{alert.message}</h3>

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[#1E3A8A]">
                                        <Bell size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 text-muted-foreground italic">Source</p>
                                        <p className="text-xs font-black tracking-tight leading-none uppercase tracking-widest">Bus {alert.bus}</p>
                                    </div>
                                </div>
                                <div className="flex-1" />
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl bg-muted text-muted-foreground hover:bg-[#1E3A8A] hover:text-white transition-all active:scale-95 shadow-sm flex items-center justify-center">
                                        <MessageSquare size={16} />
                                    </button>
                                    <button className="h-10 px-4 rounded-xl bg-background border border-border text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all active:scale-95 shadow-sm flex items-center gap-2">
                                        Resolve <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Information Card */}
                <div className="bg-[#1E3A8A] rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Info size={100} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                        <h4 className="text-2xl font-black tracking-tighter mb-4 pr-12">Total Active System Alerts</h4>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-6xl font-black tracking-tighter">{MOCK_ALERTS.length}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">incidents pending</span>
                        </div>
                        <p className="text-blue-100/60 text-[10px] font-black uppercase tracking-widest leading-relaxed mt-auto">System health: Nominal</p>
                    </div>
                </div>
            </div>

            {/* Bottom Alert Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {[
                    { label: 'Unresolved', value: '12', color: 'text-red-500', icon: AlertTriangle },
                    { label: 'Avg Resolution', value: '18m', color: 'text-amber-500', icon: Clock },
                    { label: 'Dismissed Today', value: '42', color: 'text-emerald-500', icon: CheckCircle2 },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.color.replace('text-', 'bg-') + "/10", stat.color)}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                        </div>
                        <span className={cn("text-2xl font-black tracking-tighter", stat.color)}>{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertsScreen;
