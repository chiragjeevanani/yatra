import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const timeFilters = ['Morning', 'Afternoon', 'Evening', 'Night'];

const TimetableScreen = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('Morning');

    const times = [
        { time: '08:00 AM', bus: 'B-124', status: 'On Time' },
        { time: '08:30 AM', bus: 'B-124', status: 'On Time' },
        { time: '09:00 AM', bus: 'B-124', status: 'Delayed' },
        { time: '09:30 AM', bus: 'B-124', status: 'On Time' },
        { time: '10:00 AM', bus: 'B-124', status: 'On Time' },
        { time: '10:30 AM', bus: 'B-124', status: 'On Time' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background p-5">
            <div className="mb-8 pt-2">
                <h1 className="text-3xl font-black tracking-tighter mb-2">Bus Timetable</h1>
                <p className="text-muted-foreground text-sm font-bold">Select a route to view its full schedule.</p>
            </div>

            {/* Route Selector */}
            <div className="bg-card border border-border rounded-3xl p-4 mb-8 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black tracking-tight">Route B-124</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">City Center → Airport</p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
            </div>

            {/* Time Filters */}
            <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
                {timeFilters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                            "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                            activeFilter === filter
                                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "bg-transparent border-border text-muted-foreground"
                        )}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Schedule List */}
            <div className="space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Departure Times</h2>
                <div className="grid gap-3">
                    {times.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => navigate('/route/124')}
                            className="bg-card border border-border p-4 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer active:scale-98 hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black tracking-tighter">{item.time}</h4>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Bus {item.bus}</p>
                                </div>
                            </div>
                            <span className={cn(
                                "text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest",
                                item.status === 'On Time' ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"
                            )}>
                                {item.status}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimetableScreen;
