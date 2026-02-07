import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, MapPin, Gauge, Clock, X, Navigation } from 'lucide-react';
import { cn } from '../../lib/utils';

const BusInfoCard = ({ bus, onClose }) => {
    if (!bus) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-80 bg-card border border-border shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col pointer-events-auto"
        >
            {/* Header */}
            <div className="bg-[#1E3A8A] p-6 text-white relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                    <X size={16} />
                </button>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Navigation size={24} className="rotate-45" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black tracking-tighter">{bus.number}</h3>
                        <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">{bus.registration}</p>
                    </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <div className={cn(
                        "w-2 h-2 rounded-full",
                        bus.status === 'Active' ? "bg-emerald-400" : "bg-amber-400"
                    )} />
                    {bus.status === 'Active' ? 'On Trip' : 'Delayed'}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 flex-1">
                {/* Driver Info */}
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Personnel</p>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A]">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-black">{bus.driver}</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Primary Pilot</p>
                            </div>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all">
                            <Phone size={14} />
                        </button>
                    </div>
                </div>

                {/* Tracking Metrics */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                        <div className="flex items-center gap-2 text-[#1E3A8A] mb-1">
                            <Gauge size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Speed</span>
                        </div>
                        <p className="text-sm font-black tracking-tight">42 km/h</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                        <div className="flex items-center gap-2 text-emerald-500 mb-1">
                            <Clock size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Next Stop</span>
                        </div>
                        <p className="text-sm font-black tracking-tight">7 min</p>
                    </div>
                </div>

                {/* Route Info */}
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Route</p>
                    <div className="p-4 bg-muted/50 rounded-2xl border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                            <MapPin size={16} className="text-[#1E3A8A]" />
                            <span className="text-sm font-bold tracking-tight">{bus.route}</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-[#1E3A8A] rounded-full" />
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase mt-2 text-right">Progress: 75%</p>
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 pt-0">
                <button className="w-full py-4 bg-background border-2 border-[#1E3A8A] text-[#1E3A8A] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#1E3A8A] hover:text-white transition-all active:scale-95">
                    View Full Flight Log
                </button>
            </div>
        </motion.div>
    );
};

export default BusInfoCard;
