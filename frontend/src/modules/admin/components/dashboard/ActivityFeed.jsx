import React from 'react';
import { motion } from 'framer-motion';
import { Bus, User, MapPin, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

const activities = [
    { id: 1, type: 'trip', icon: Bus, message: 'Bus B-124 started trip on Route R-101', time: '2 min ago', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 2, type: 'driver', icon: User, message: 'Driver Suresh Patil marked as On-Duty', time: '15 min ago', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 3, type: 'route', icon: MapPin, message: 'New stop added to Route R-105', time: '1 hour ago', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 4, type: 'alert', icon: Clock, message: 'Delay reported for Bus B-142', time: '2 hours ago', color: 'text-red-500', bg: 'bg-red-500/10' },
];

const ActivityFeed = () => {
    return (
        <div className="bg-card border border-border rounded-[2rem] p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <Clock size={16} /> Activity Feed
            </h3>

            <div className="space-y-6">
                {activities.map((activity, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={activity.id}
                        className="flex gap-4 group"
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                            activity.bg,
                            activity.color
                        )}>
                            <activity.icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-foreground leading-tight mb-1 truncate group-hover:text-[#1E3A8A] transition-colors">
                                {activity.message}
                            </p>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {activity.time}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 border border-dashed border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all">
                View All Events
            </button>
        </div>
    );
};

export default ActivityFeed;
