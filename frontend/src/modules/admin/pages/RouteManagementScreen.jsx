import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Route as RouteIcon,
    MapPin,
    ArrowRight,
    Clock,
    Navigation,
    MoreVertical,
    ChevronRight,
    Map
} from 'lucide-react';
import { MOCK_ROUTES } from '../lib/mockData';
import { cn } from '../lib/utils';

const RouteManagementScreen = () => {
    const [selectedRoute, setSelectedRoute] = useState(MOCK_ROUTES[0]);
    const [searchQuery, setSearchQuery] = useState('');

    const routes = MOCK_ROUTES.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-80px)] flex relative overflow-hidden">
            {/* Left Sidebar: Route List */}
            <div className="w-96 bg-card border-r border-border h-full flex flex-col z-10 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-border bg-muted/20">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter">Routes</h2>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Manage network lines</p>
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all active:scale-95">
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Search routes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 bg-background border border-border rounded-2xl pl-12 pr-4 text-xs font-bold outline-none focus:border-[#1E3A8A] transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                    {routes.map((route) => (
                        <motion.button
                            key={route.id}
                            onClick={() => setSelectedRoute(route)}
                            className={cn(
                                "w-full text-left p-6 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden",
                                selectedRoute?.id === route.id
                                    ? "bg-[#1E3A8A] border-[#1E3A8A] shadow-xl shadow-[#1E3A8A]/20"
                                    : "bg-background border-border hover:bg-muted/50"
                            )}
                        >
                            {selectedRoute?.id === route.id && (
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <RouteIcon size={60} className="text-white" />
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-4">
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                    selectedRoute?.id === route.id ? "bg-white/20 text-white" : "bg-[#1E3A8A]/10 text-[#1E3A8A]"
                                )}>
                                    {route.code}
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-bold uppercase",
                                    selectedRoute?.id === route.id ? "text-blue-200" : "text-muted-foreground"
                                )}>
                                    <Clock size={12} /> {route.totalTime}
                                </div>
                            </div>

                            <h3 className={cn(
                                "text-lg font-black tracking-tight mb-2",
                                selectedRoute?.id === route.id ? "text-white" : "text-foreground"
                            )}>
                                {route.name}
                            </h3>

                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-bold uppercase",
                                    selectedRoute?.id === route.id ? "text-white/60" : "text-muted-foreground"
                                )}>
                                    <MapPin size={12} /> {route.stops.length} Stops
                                </div>
                                <div className={cn("w-1 h-1 rounded-full", selectedRoute?.id === route.id ? "bg-white/30" : "bg-border")} />
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-bold uppercase",
                                    selectedRoute?.id === route.id ? "text-white/60" : "text-muted-foreground"
                                )}>
                                    <Navigation size={12} /> {route.distance}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Right Side: Route Details & Timeline */}
            <div className="flex-1 overflow-y-auto bg-muted/10 p-12 space-y-8 no-scrollbar">
                <AnimatePresence mode="wait">
                    {selectedRoute ? (
                        <motion.div
                            key={selectedRoute.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12"
                        >
                            {/* Route Overview Header */}
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-[2rem] bg-[#1E3A8A] flex items-center justify-center text-white shadow-2xl">
                                            <RouteIcon size={32} />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black tracking-tighter">{selectedRoute.name}</h2>
                                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">{selectedRoute.code} Dashboard</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground font-black text-[10px] uppercase tracking-widest">Start:</span>
                                            <span className="font-bold text-sm">{selectedRoute.stops?.[0]?.name || 'N/A'}</span>
                                        </div>
                                        <ArrowRight className="text-muted-foreground" size={16} />
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground font-black text-[10px] uppercase tracking-widest">End:</span>
                                            <span className="font-bold text-sm">{selectedRoute.stops?.[selectedRoute.stops.length - 1]?.name || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pb-2">
                                    <button className="h-14 px-8 rounded-2xl bg-white border border-border font-black text-xs uppercase tracking-widest hover:bg-muted transition-all active:scale-95 shadow-sm">
                                        Edit Alignment
                                    </button>
                                    <button className="h-14 px-8 rounded-2xl bg-[#1E3A8A] text-white font-black text-xs uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-xl shadow-[#1E3A8A]/20 active:scale-95 flex items-center gap-2">
                                        <Map size={18} /> View on Map
                                    </button>
                                </div>
                            </div>

                            {/* Stop Timeline */}
                            <div className="bg-card border border-border rounded-[3rem] p-12 shadow-sm">
                                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-12 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A]">
                                        <MapPin size={18} />
                                    </div>
                                    Stop Sequence & Timing
                                </h3>

                                <div className="relative">
                                    {/* Timeline Vertical Line */}
                                    <div className="absolute left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-[#1E3A8A] via-blue-400 to-[#1E3A8A]/20 rounded-full" />

                                    <div className="space-y-12 relative z-10">
                                        {Array.isArray(selectedRoute.stops) && selectedRoute.stops.map((stop, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-8 group"
                                            >
                                                {/* Stop Node */}
                                                <div className="relative">
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110",
                                                        i === 0 ? "bg-[#1E3A8A] text-white scale-110" : "bg-card border-4 border-white dark:border-slate-900 shadow-md text-muted-foreground group-hover:bg-[#1E3A8A] group-hover:text-white"
                                                    )}>
                                                        {i === 0 ? <Navigation size={20} /> : <span className="text-xs font-black">{i + 1}</span>}
                                                    </div>
                                                </div>

                                                {/* Stop Info Card */}
                                                <div className="flex-1 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-[2rem] p-6 transition-all group-hover:shadow-md cursor-pointer flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-xl font-black tracking-tight mb-1">{stop.name}</h4>
                                                        <div className="flex items-center gap-4">
                                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                                <Clock size={12} /> ATA: {stop.time}
                                                            </p>
                                                            <span className="w-1 h-1 rounded-full bg-border" />
                                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                                                Station: {stop.code}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="w-10 h-10 rounded-xl bg-white text-[#1E3A8A] flex items-center justify-center shadow-sm hover:scale-110 transition-all active:scale-95">
                                                            <MoreVertical size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Statistics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Daily Frequency</p>
                                    <div className="flex items-end gap-2">
                                        <h4 className="text-3xl font-black tracking-tighter">48</h4>
                                        <span className="text-xs font-bold text-muted-foreground mb-1.5 uppercase">Trips / Day</span>
                                    </div>
                                    <div className="mt-6 h-1 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="w-4/5 h-full bg-[#1E3A8A] rounded-full" />
                                    </div>
                                </div>
                                <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Average Load</p>
                                    <div className="flex items-end gap-2">
                                        <h4 className="text-3xl font-black tracking-tighter">62%</h4>
                                        <span className="text-xs font-bold text-muted-foreground mb-1.5 uppercase">Capacity</span>
                                    </div>
                                    <div className="mt-6 h-1 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-emerald-500 rounded-full" />
                                    </div>
                                </div>
                                <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Assigned Drivers</p>
                                    <div className="flex items-end gap-2">
                                        <h4 className="text-3xl font-black tracking-tighter">12</h4>
                                        <span className="text-xs font-bold text-muted-foreground mb-1.5 uppercase">Personnel</span>
                                    </div>
                                    <div className="flex -space-x-3 mt-4">
                                        {[1, 2, 3, 4].map(j => (
                                            <div key={j} className="w-10 h-10 rounded-full border-4 border-card bg-muted flex items-center justify-center">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Driver${j}`}
                                                    className="w-full h-full rounded-full"
                                                    alt="Driver"
                                                />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-4 border-card bg-[#1E3A8A] text-white flex items-center justify-center text-[10px] font-black">
                                            +8
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                            <div className="w-24 h-24 rounded-[2rem] bg-muted/50 flex items-center justify-center text-muted-foreground mb-6">
                                <RouteIcon size={48} />
                            </div>
                            <h3 className="text-2xl font-black tracking-tighter mb-2">Select a Route</h3>
                            <p className="text-muted-foreground font-bold text-sm max-w-xs uppercase tracking-widest text-[10px]">Pick a route from the list to view its stop sequence and operational metrics</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RouteManagementScreen;
