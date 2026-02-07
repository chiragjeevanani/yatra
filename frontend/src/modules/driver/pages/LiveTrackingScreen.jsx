import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Clock, ShieldCheck, ChevronUp } from 'lucide-react';
import DraggableInfoSheet from '../components/DraggableInfoSheet';
import BottomNavigation from '../components/BottomNavigation';
import { useDriver } from '../contexts/DriverContext';
import { useBusData } from '../../../contexts/BusDataProvider';

const LiveTrackingScreen = () => {
    const { assignedBus } = useDriver();
    const { updateBusLocation } = useBusData();
    const [simulatedProgress, setSimulatedProgress] = useState(0);

    // Simulate location updates purely on client side
    useEffect(() => {
        if (assignedBus.tripStatus !== 'Started') return;

        const interval = setInterval(() => {
            setSimulatedProgress(prev => {
                const next = (prev + 0.01) % 1;
                // Move between two mock points
                const lat = 28.6139 + (next * 0.01);
                const lng = 77.2090 + (next * 0.01);
                updateBusLocation(assignedBus.id, { lat, lng });
                return next;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [assignedBus.tripStatus, assignedBus.id, updateBusLocation]);

    return (
        <div className="h-screen w-screen bg-muted overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/static/77.209,28.6139,15,0/800x800?access_token=pk.eyJ1IjoiY2hpcmFnajk5IiwiYSI6ImNrcXZoenR6bzBkMWkybm8yYjZyaGJ6YmoifQ')] bg-cover bg-center shadow-inner">
                <div className="absolute inset-0 bg-[#1E3A8A]/10 mix-blend-multiply" />
            </div>

            {/* Map UI Overlay */}
            <div className="absolute top-8 left-5 right-5 flex justify-between items-start z-10">
                <div className="p-4 bg-background/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-border">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Current Speed</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-driver-primary">42</span>
                        <span className="text-[10px] font-bold text-muted-foreground">km/h</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="px-5 py-2.5 bg-driver-primary text-driver-primary-foreground rounded-2xl shadow-xl flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Live GPS</span>
                    </div>
                </div>
            </div>

            {/* Pulsing Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                    <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-6 bg-[#1E3A8A] rounded-full"
                    />
                    <div className="relative w-10 h-10 bg-[#1E3A8A] rounded-full border-2 border-white flex items-center justify-center shadow-2xl text-white">
                        <Navigation size={18} className="fill-current" />
                    </div>
                </div>
            </div>

            <DraggableInfoSheet>
                <div className="space-y-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 rounded-lg text-white text-[8px] font-black uppercase ${assignedBus.tripStatus === 'Started' ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`}>
                                    {assignedBus.tripStatus === 'Started' ? 'On Trip' : 'Trip Paused'}
                                </span>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">{assignedBus.number}</span>
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter">Next: {assignedBus.nextStop}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-black text-driver-primary tracking-tighter">{assignedBus.eta}</p>
                            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">ETA</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/30 p-4 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-2 text-driver-primary mb-1">
                                <ShieldCheck size={16} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Safety</span>
                            </div>
                            <p className="text-xs font-bold">Standard Speed</p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-2 text-emerald-500 mb-1">
                                <Clock size={16} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Schedule</span>
                            </div>
                            <p className="text-xs font-bold">On Schedule</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Upcoming Stops</h3>
                        {[
                            { name: 'City Hospital', distance: '1.2 km', time: '12 min' },
                            { name: 'Tech Park', distance: '3.4 km', time: '25 min' },
                        ].map((stop, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]/30" />
                                    <span className="text-sm font-bold tracking-tight">{stop.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-[#1E3A8A]">{stop.time}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{stop.distance}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DraggableInfoSheet>

            <BottomNavigation />
        </div>
    );
};

export default LiveTrackingScreen;
