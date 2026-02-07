import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Layers, Navigation, BusFront, Info, User } from 'lucide-react';
import BusMarker from '../components/tracking/BusMarker';
import BusInfoCard from '../components/tracking/BusInfoCard';
import { useSimulation } from '../../../hooks/useSimulation';
import { cn } from '../lib/utils';

const LiveTrackingScreen = () => {
    const [selectedBus, setSelectedBus] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { buses } = useSimulation(true); // Admin drives the simulation

    // Safety check for buses array
    const safeBuses = Array.isArray(buses) ? buses : [];

    const filteredBuses = safeBuses.filter(bus =>
        (bus.number?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (bus.driver?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-80px)] flex relative overflow-hidden">
            {/* Sidebar / Bus List */}
            <div className="w-80 bg-card border-r border-border h-full flex flex-col z-20 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-xl font-black tracking-tighter mb-4">Live Monitoring</h2>
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Find bus or driver..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 bg-background border border-border rounded-xl pl-10 pr-4 text-xs font-bold outline-none focus:border-[#1E3A8A] transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded-md">
                            {filteredBuses.length} Results
                        </span>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                    {filteredBuses.map((bus) => (
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={bus.id}
                            onClick={() => setSelectedBus(bus)}
                            className={cn(
                                "w-full text-left p-4 rounded-[1.5rem] border transition-all duration-200 group relative",
                                selectedBus?.id === bus.id
                                    ? "bg-[#1E3A8A] border-[#1E3A8A] shadow-lg shadow-[#1E3A8A]/20"
                                    : "bg-background border-border hover:bg-muted/50"
                            )}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-sm",
                                    selectedBus?.id === bus.id ? "bg-white text-[#1E3A8A]" : "bg-muted text-muted-foreground group-hover:bg-[#1E3A8A]/10 group-hover:text-[#1E3A8A]"
                                )}>
                                    <BusFront size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={cn(
                                        "text-sm font-black tracking-tight",
                                        selectedBus?.id === bus.id ? "text-white" : "text-foreground"
                                    )}>
                                        {bus.number}
                                    </p>
                                    <p className={cn(
                                        "text-[9px] font-bold uppercase tracking-widest",
                                        selectedBus?.id === bus.id ? "text-white/60" : "text-muted-foreground"
                                    )}>
                                        {bus.registration}
                                    </p>
                                </div>
                                <div className={cn(
                                    "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest",
                                    bus.status === 'Active'
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-red-500/10 text-red-500"
                                )}>
                                    {bus.status}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={12} className={selectedBus?.id === bus.id ? "text-white/60" : "text-muted-foreground"} />
                                <span className={cn(
                                    "text-[10px] font-bold",
                                    selectedBus?.id === bus.id ? "text-white/80" : "text-muted-foreground"
                                )}>
                                    {bus.driver}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
                {/* Simulated Map Background Labels */}
                <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute font-black text-6xl uppercase tracking-[0.5em] whitespace-nowrap"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                transform: `rotate(${(Math.random() - 0.5) * 40}deg)`
                            }}
                        >
                            Transit Sector {i + 1}
                        </div>
                    ))}
                </div>

                {/* Map Grid */}
                <div
                    className="absolute inset-0 opacity-20 dark:opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(#1E3A8A 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Map Controls */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 z-30">
                    <button className="w-12 h-12 rounded-2xl bg-card border border-border shadow-xl flex items-center justify-center text-muted-foreground hover:text-[#1E3A8A] transition-all active:scale-95">
                        <Layers size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-2xl bg-card border border-border shadow-xl flex items-center justify-center text-muted-foreground hover:text-[#1E3A8A] transition-all active:scale-95">
                        <Navigation size={20} />
                    </button>
                </div>

                {/* Bus Markers Layer */}
                <div className="absolute inset-0 z-10 p-20">
                    {filteredBuses.map((bus) => (
                        <BusMarker
                            key={bus.id}
                            bus={bus}
                            isActive={selectedBus?.id === bus.id}
                            onClick={() => setSelectedBus(bus)}
                        />
                    ))}
                </div>

                {/* Selected Bus Info Card Overlay */}
                <AnimatePresence>
                    {selectedBus && (
                        <div className="absolute right-6 bottom-6 z-40 pointer-events-none">
                            <BusInfoCard
                                bus={selectedBus}
                                onClose={() => setSelectedBus(null)}
                            />
                        </div>
                    )}
                </AnimatePresence>

                {/* Map Center Coordinate Display */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white dark:bg-card dark:text-foreground text-[8px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full backdrop-blur-md z-30 flex items-center gap-4">
                    <span>GRID: 18.5204° N, 73.8567° E</span>
                    <div className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-white/50">PUNE METRO TRANSIT</span>
                </div>
            </div>
        </div>
    );
};

export default LiveTrackingScreen;
