import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Clock, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const BusCard = ({ busNumber, routeName, eta, distance, status = 'On Time', className, onClick }) => {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "bg-card rounded-2xl p-4 border border-border shadow-sm flex flex-col gap-3 min-w-[200px] cursor-pointer",
                className
            )}
        >
            <div className="flex justify-between items-start">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                    <Bus size={24} />
                </div>
                <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                    status === 'On Time' ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"
                )}>
                    {status}
                </span>
            </div>

            <div>
                <h3 className="text-xl font-black tracking-tight">{busNumber}</h3>
                <p className="text-sm font-bold text-muted-foreground truncate">{routeName}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Clock size={14} className="text-primary" />
                    <span>{eta}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                    <MapPin size={14} className="text-muted-foreground" />
                    <span>{distance}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default BusCard;
