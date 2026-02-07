import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Navigation, MapPin, Clock, Info, ShieldCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DraggableBottomSheet from '../components/DraggableBottomSheet';
import { cn } from '../lib/utils';
import { useBusData } from '../../../contexts/BusDataProvider';

const LiveTrackingScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { buses } = useBusData();
    const bus = buses[id] || buses['124']; // Fallback for demo

    return (
        <div className="h-screen w-screen bg-muted overflow-hidden relative">
            {/* Map Content Placeholder */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/static/77.209,28.6139,15,0/800x800?access_token=pk.eyJ1IjoiY2hpcmFnajk5IiwiYSI6ImNrcXZoenR6bzBkMWkybm8yYjZyaGJ6YmoifQ')] bg-cover bg-center grayscale shadow-inner">
                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </div>

            {/* Header Overlay */}
            <div className="absolute top-6 left-5 right-5 flex justify-between items-center z-10">
                <button onClick={() => navigate(-1)} className="p-3 bg-background/90 backdrop-blur-md rounded-2xl shadow-xl border border-border">
                    <ArrowLeft size={20} />
                </button>
                <div className="px-4 py-2 bg-background/90 backdrop-blur-md rounded-2xl shadow-xl border border-border flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
            </div>

            {/* Pulsing Bus Marker - Simulated to follow live data */}
            <div
                className="absolute z-20 transition-all duration-1000 ease-in-out"
                style={{
                    top: `${50 + (bus.location.lat - 28.6139) * 1000}%`,
                    left: `${50 + (bus.location.lng - 77.2090) * 1000}%`
                }}
            >
                <div className="relative">
                    <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-4 bg-primary rounded-full"
                    />
                    <div className="relative w-8 h-8 bg-primary rounded-full border-2 border-white flex items-center justify-center shadow-lg text-white">
                        <Navigation size={14} className="fill-current" />
                    </div>
                </div>
            </div>

            {/* User Location Marker */}
            <div className="absolute top-[60%] left-[40%] z-20">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md ring-4 ring-blue-500/20" />
            </div>

            {/* Info Sheet */}
            <DraggableBottomSheet>
                <div className="py-2">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={cn(
                                    "px-2 py-0.5 text-white text-[8px] font-black uppercase rounded-lg",
                                    bus.status === 'On Time' ? "bg-emerald-500" : "bg-amber-500"
                                )}>
                                    {bus.status}
                                </span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {bus.tripStatus === 'Started' ? `Arriving in ${bus.eta}` : 'Trip Not Started'}
                                </span>
                            </div>
                            <h1 className="text-2xl font-black tracking-tight">Bus {bus.number}</h1>
                            <p className="text-sm font-bold text-muted-foreground">{bus.route}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-black text-primary tracking-tighter">
                                {bus.tripStatus === 'Started' ? bus.eta : '--:--'}
                            </span>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">ETA</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-muted/50 p-4 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-2 mb-2 text-primary">
                                <ShieldCheck size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                            </div>
                            <p className="text-xs font-bold text-foreground">Safe Travel Certified</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-2 mb-2 text-emerald-500">
                                <Info size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Status</span>
                            </div>
                            <p className="text-xs font-bold text-foreground">Light Occupancy</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Next Stops</h3>
                        {[
                            { name: 'Old Town Market', eta: '2 mins', current: true },
                            { name: 'Tech Park Phase 1', eta: '12 mins' },
                            { name: 'City Hospital', eta: '25 mins' },
                        ].map((stop, i) => (
                            <div key={i} className="flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        stop.current ? "bg-primary" : "bg-muted"
                                    )} />
                                    <span className={cn(
                                        "text-sm font-bold",
                                        stop.current ? "text-foreground" : "text-muted-foreground"
                                    )}>{stop.name}</span>
                                </div>
                                <span className="text-xs font-black text-primary">{stop.eta}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full h-14 bg-muted text-foreground rounded-2xl font-black text-sm uppercase tracking-widest mt-12 mb-4 hover:bg-muted/80 transition-colors"
                    >
                        Full Route Schedule
                    </button>
                </div>
            </DraggableBottomSheet>
        </div>
    );
};

export default LiveTrackingScreen;
