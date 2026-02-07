import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Map, Star, Share2, Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import RouteTimeline from '../components/RouteTimeline';
import { useBusData } from '../../../contexts/BusDataProvider';
import { cn } from '../lib/utils';

const RouteDetailsScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { buses } = useBusData();
    const bus = buses[id] || buses['124']; // Fallback

    const stops = [
        { name: "Central Mall", time: "10:00 AM", completed: true },
        { name: "Grand Avenue", time: "10:15 AM", completed: true },
        { name: "Old Town Market", time: "10:30 AM", current: true },
        { name: "Tech Park Phase 1", time: "10:45 AM" },
        { name: "City Hospital", time: "11:00 AM" },
        { name: "Airport Terminal 2", time: "11:20 AM" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Dynamic Header */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/77.209,28.6139,13,0/600x400?access_token=pk.eyJ1IjoiY2hpcmFnajk5IiwiYSI6ImNrcXZoenR6bzBkMWkybm8yYjZyaGJ6YmoifQ')] bg-cover bg-center grayscale shadow-inner" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Navigation Actions */}
                <div className="absolute top-6 left-5 right-5 flex justify-between items-center z-10">
                    <button onClick={() => navigate(-1)} className="p-3 bg-background/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex gap-3">
                        <button className="p-3 bg-background/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                            <Star size={20} />
                        </button>
                        <button className="p-3 bg-background/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-6 left-5 right-5">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-end justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-black uppercase rounded-lg">Bus {bus.number}</span>
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                                    bus.status === 'On Time' ? "text-emerald-500" : "text-amber-500"
                                )}>{bus.status}</span>
                            </div>
                            <h1 className="text-3xl font-black tracking-tighter">{bus.route}</h1>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-background px-5 -mt-2 relative z-10 rounded-t-[40px] pt-8 space-y-8 pb-32">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Time', value: '45 mins', icon: Clock },
                        { label: 'Distance', value: '12.4 km', icon: Map },
                        { label: 'Wait Time', value: '3 mins', icon: Info },
                    ].map((stat, i) => (
                        <div key={i} className="bg-card border border-border p-3 rounded-2xl shadow-sm text-center">
                            <stat.icon size={16} className="mx-auto mb-2 text-primary opacity-70" />
                            <p className="text-[8px] font-bold text-muted-foreground uppercase mb-0.5">{stat.label}</p>
                            <p className="text-xs font-black tracking-tight">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black tracking-tight uppercase tracking-widest text-[10px] text-muted-foreground">Route Timeline</h2>
                        <button className="text-[10px] font-bold text-primary uppercase">View Map</button>
                    </div>
                    <RouteTimeline stops={stops} />
                </div>
            </div>

            {/* Sticky Primary Action */}
            <div className="fixed bottom-24 inset-x-5 z-40">
                <button
                    onClick={() => navigate(`/track/${id}`)}
                    className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    <Map size={20} /> LIVE TRACK BUS
                </button>
            </div>
        </div>
    );
};

export default RouteDetailsScreen;
