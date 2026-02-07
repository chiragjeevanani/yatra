import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

const KPICard = ({ label, value, trend, trendType, icon: Icon, delay = 0 }) => {
    const isUp = trendType === 'up';
    const isDown = trendType === 'down';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -5 }}
            className="group bg-card border border-border p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Icon size={80} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-300">
                        <Icon size={24} />
                    </div>
                    {trend !== '0' && (
                        <div className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                            isUp ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                        )}>
                            {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {trend}%
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black tracking-tighter text-foreground">{value}</h3>
                        <span className="text-xs font-bold text-muted-foreground">this month</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default KPICard;
