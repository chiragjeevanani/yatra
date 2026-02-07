import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_ALERTS } from '../../lib/mockData';

const AlertsPanel = () => {
    return (
        <div className="bg-card border border-border rounded-[2rem] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-500" /> Live Alerts
                </h3>
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full pulse">
                    {MOCK_ALERTS.length} NEW
                </span>
            </div>

            <div className="space-y-4">
                {MOCK_ALERTS.map((alert, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={alert.id}
                        className={cn(
                            "p-4 rounded-2xl border flex flex-col gap-2 group cursor-pointer hover:shadow-md transition-all active:scale-98",
                            alert.priority === 'high'
                                ? "bg-red-500/5 border-red-500/10 hover:bg-red-500/10"
                                : "bg-amber-500/5 border-amber-500/10 hover:bg-amber-500/10"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    alert.priority === 'high' ? "bg-red-500" : "bg-amber-500"
                                )} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/80">
                                    Bus {alert.bus}
                                </span>
                            </div>
                            <span className="text-[8px] font-bold text-muted-foreground uppercase">{alert.time}</span>
                        </div>

                        <p className="text-xs font-bold leading-relaxed pr-6 relative">
                            {alert.message}
                            <ChevronRight size={14} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 bg-[#1E3A8A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-lg shadow-[#1E3A8A]/20">
                Open Controls Center
            </button>
        </div>
    );
};

export default AlertsPanel;
