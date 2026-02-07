import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Calendar,
    Clock,
    Route as RouteIcon,
    ArrowRight,
    MoreVertical,
    Timer,
    CalendarDays,
    Settings,
    Play,
    StopCircle
} from 'lucide-react';
import { MOCK_SCHEDULES } from '../lib/mockData';
import { cn } from '../lib/utils';

const ScheduleManagementScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDay, setSelectedDay] = useState('Today');

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Today'];

    return (
        <div className="p-8 space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground">Trip Scheduling</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-[10px]">Coordinate trip timings and route frequencies</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-12 px-6 rounded-2xl bg-card border border-border flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-muted transition-all active:scale-95 shadow-sm">
                        <CalendarDays size={18} /> View Calendar
                    </button>
                    <button className="h-12 px-6 rounded-2xl bg-[#1E3A8A] text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-xl shadow-[#1E3A8A]/20 active:scale-95">
                        <Plus size={18} /> Create Schedule
                    </button>
                </div>
            </div>

            {/* Quick Select Days */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {days.reverse().map(day => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={cn(
                            "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                            selectedDay === day
                                ? "bg-[#1E3A8A] border-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/20"
                                : "bg-card border-transparent text-muted-foreground hover:border-border"
                        )}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Content Container */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Schedule Table */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="text"
                                    placeholder="Filter by route or trip code..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 bg-background border border-border rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-[#1E3A8A] transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted/10">
                                        <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Route & Trip</th>
                                        <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Timing</th>
                                        <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Frequency</th>
                                        <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                                        <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Manage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {MOCK_SCHEDULES.map((schedule, i) => (
                                        <motion.tr
                                            key={schedule.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-muted/30 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-11 h-11 rounded-[1.2rem] bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] shadow-sm">
                                                        <RouteIcon size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black tracking-tight">{schedule.routeName}</p>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{schedule.routeCode} Trip T-{100 + i}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="px-2 py-1 bg-blue-500/10 text-[#1E3A8A] rounded-lg text-xs font-black">
                                                        {schedule.startTime}
                                                    </div>
                                                    <ArrowRight size={14} className="text-muted-foreground" />
                                                    <div className="px-2 py-1 bg-blue-500/10 text-[#1E3A8A] rounded-lg text-xs font-black">
                                                        {schedule.endTime}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-xs font-bold tracking-tight">{schedule.frequency} mins</p>
                                                <p className="text-[9px] font-black text-muted-foreground uppercase">Normal Load</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={cn(
                                                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                    schedule.status === 'Running' ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                                                )}>
                                                    <div className={cn("w-1.5 h-1.5 rounded-full", schedule.status === 'Running' ? "bg-emerald-500" : "bg-amber-500")} />
                                                    {schedule.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="w-10 h-10 rounded-xl bg-muted text-muted-foreground hover:bg-[#1E3A8A] hover:text-white transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center mx-auto mr-0">
                                                    <Settings size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Automation & Controls */}
                <div className="space-y-6">
                    <div className="bg-[#1E3A8A] rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Timer size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tighter mb-4">Dispatcher Pro</h3>
                            <p className="text-blue-100/70 text-sm font-bold leading-relaxed mb-8 uppercase tracking-widest text-[10px]">Automated scheduling engine active</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                                    <span className="text-xs font-black uppercase tracking-widest">Auto-Scale Frequency</span>
                                    <div className="w-10 h-6 bg-emerald-400 rounded-full relative p-1 flex items-center justify-end">
                                        <div className="w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                                    <span className="text-xs font-black uppercase tracking-widest">Peak Hour Boost</span>
                                    <div className="w-10 h-6 bg-emerald-400 rounded-full relative p-1 flex items-center justify-end">
                                        <div className="w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-white text-[#1E3A8A] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2">
                                <Play size={16} fill="currentColor" /> Run Optimizer
                            </button>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                            System Operational Status
                        </h4>
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                    <span>Morning Rush</span>
                                    <span className="text-[#1E3A8A]">Active</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-[#1E3A8A] rounded-full" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                    <span>Evening Peak</span>
                                    <span className="text-muted-foreground italic">Scheduled</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="w-0 h-full bg-slate-300 rounded-full" />
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-8 py-4 border-2 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                            <StopCircle size={16} /> Emergency Shutdown
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleManagementScreen;
