import React from 'react';
import { motion } from 'framer-motion';
import { BusFront, Navigation } from 'lucide-react';
import { cn } from '../../lib/utils';

const BusMarker = ({ bus, isActive, onClick }) => {
    const statusColors = {
        'Active': 'bg-[#1E3A8A]',
        'Delayed': 'bg-amber-500',
        'Maintenance': 'bg-red-500',
    };

    return (
        <motion.div
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="absolute cursor-pointer group"
            style={{
                left: `${(Math.random() * 80) + 10}%`,
                top: `${(Math.random() * 80) + 10}%`
            }}
            onClick={onClick}
        >
            {/* Range Pulse */}
            {isActive && (
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping scale-150" />
            )}

            {/* Label */}
            {!isActive && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-background border border-border px-2 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <p className="text-[10px] font-black whitespace-nowrap">{bus.number}</p>
                </div>
            )}

            {/* Marker Body */}
            <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-300 relative z-10",
                statusColors[bus.status],
                isActive ? "scale-125 border-4 border-white dark:border-slate-800 ring-4 ring-blue-500/20" : ""
            )}>
                <BusFront size={20} strokeWidth={isActive ? 2.5 : 2} />

                {/* Heading Arrow */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center p-0.5 shadow-md">
                    <Navigation size={10} className="text-blue-600 fill-blue-600 rotate-45" />
                </div>
            </div>
        </motion.div>
    );
};

export default BusMarker;
