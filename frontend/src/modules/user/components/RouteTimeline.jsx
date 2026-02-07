import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Circle, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const RouteTimeline = ({ stops }) => {
    return (
        <div className="space-y-0">
            {stops.map((stop, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 relative"
                >
                    {/* Timeline Connector */}
                    <div className="flex flex-col items-center">
                        <div className={cn(
                            "w-4 h-4 rounded-full border-2 flex items-center justify-center z-10",
                            stop.completed ? "bg-primary border-primary" : "bg-background border-muted-foreground/30"
                        )}>
                            {stop.completed ? (
                                <CheckCircle2 size={10} className="text-primary-foreground" />
                            ) : (
                                <Circle size={4} className="fill-muted-foreground/30 text-transparent" />
                            )}
                        </div>
                        {i !== stops.length - 1 && (
                            <div className={cn(
                                "w-0.5 flex-1 my-1",
                                stop.completed ? "bg-primary" : "bg-muted-foreground/20"
                            )} />
                        )}
                    </div>

                    <div className={cn(
                        "pb-8 flex-1",
                        i === stops.length - 1 ? "pb-0" : ""
                    )}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className={cn(
                                    "text-sm font-bold tracking-tight mb-0.5",
                                    stop.completed ? "text-foreground/50 line-through" : "text-foreground"
                                )}>
                                    {stop.name}
                                </h4>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {stop.time}
                                </p>
                            </div>
                            {stop.current && (
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded-md border border-primary/20 animate-pulse">
                                    Bus is here
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default RouteTimeline;
