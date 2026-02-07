import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, SlidersHorizontal, Clock, MapPin, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusCard from '../components/BusCard';
import { cn } from '../lib/utils';

const filters = ['Fastest', 'Cheapest', 'Least Walking', 'AC Only'];

const SearchResultsScreen = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('Fastest');

    const results = [
        { id: 1, busNumber: "B-124", routeName: "City Center - Airport", eta: "4 mins", distance: "200m", fare: "₹40", type: "AC" },
        { id: 2, busNumber: "R-45", routeName: "Central Mall - Suburbs", eta: "7 mins", distance: "450m", fare: "₹25", status: "Delayed" },
        { id: 3, busNumber: "EX-10", routeName: "Express - Tech Park", eta: "10 mins", distance: "1.2km", fare: "₹60", type: "Electric" },
        { id: 4, busNumber: "M-90", routeName: "Grand Station - Old Town", eta: "15 mins", distance: "2.1km", fare: "₹20" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Search Header */}
            <div className="bg-card p-5 pb-6 shadow-sm border-b border-border sticky top-0 z-20">
                <div className="flex items-center gap-4 mb-6 pt-2">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex-1">
                        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Your Trip</h2>
                        <div className="flex items-center gap-2 text-sm font-black tracking-tight">
                            <span>Current</span>
                            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                            <span>Airport</span>
                        </div>
                    </div>
                    <button className="p-2.5 bg-muted rounded-xl text-foreground shadow-sm">
                        <SlidersHorizontal size={20} />
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {filters.map((filter) => (
                        <motion.button
                            key={filter}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                                activeFilter === filter
                                    ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "bg-transparent border-border text-muted-foreground"
                            )}
                        >
                            {filter}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Results List */}
            <div className="p-5 space-y-4 pb-28">
                <AnimatePresence>
                    {results.map((bus, i) => (
                        <motion.div
                            key={bus.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => navigate(`/route/${bus.id}`)}
                            className="group"
                        >
                            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm active:scale-98 transition-all relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black tracking-tighter truncate max-w-[150px]">{bus.busNumber}</h3>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{bus.routeName}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-lg font-black text-primary tracking-tighter">{bus.fare}</span>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{bus.type || 'Standard'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={14} className="text-primary" />
                                        <span>{bus.distance} away</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-foreground">Leaving in {bus.eta}</span>
                                    </div>
                                </div>

                                {bus.status === 'Delayed' && (
                                    <div className="absolute top-0 right-0 px-3 py-1 bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest rounded-bl-xl">
                                        Delayed
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Floating Action for sorting */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
                <button className="px-6 py-3 bg-foreground text-background rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 active:scale-95 transition-all">
                    Sort by Recommended
                </button>
            </div>
        </div>
    );
};

export default SearchResultsScreen;
