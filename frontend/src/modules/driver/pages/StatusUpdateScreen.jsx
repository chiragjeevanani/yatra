import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Coffee, MoreVertical } from 'lucide-react';
import { useDriver } from '../contexts/DriverContext';
import BottomNavigation from '../components/BottomNavigation';

const StatusUpdateScreen = () => {
    const { assignedBus, updateStatus } = useDriver();

    const statuses = [
        { id: 'On Time', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', desc: 'Normal Operation' },
        { id: 'Delayed', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', desc: 'Heavy Traffic / Roadwork' },
        { id: 'Breakdown', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', desc: 'Mechanical Failure' },
        { id: 'Off Duty', icon: Coffee, color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/20', desc: 'Shift Ended / Break' },
    ];

    return (
        <div className="min-h-screen bg-background p-5 pb-28">
            <div className="mb-10 pt-2">
                <h1 className="text-3xl font-black tracking-tighter mb-2">Service Status</h1>
                <p className="text-muted-foreground font-bold text-sm tracking-tight leading-relaxed">
                    Update your current operational status to inform passengers.
                </p>
            </div>

            <div className="space-y-4">
                {statuses.map((status, i) => (
                    <motion.button
                        key={status.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateStatus(status.id)}
                        className={`w-full p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between shadow-sm ${assignedBus.status === status.id
                            ? `${status.bg} ${status.border} border-current`
                            : 'bg-card border-border'
                            }`}
                    >
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${assignedBus.status === status.id ? 'bg-white shadow-lg shadow-black/5' : 'bg-muted/50'
                                }`}>
                                <status.icon size={28} className={status.color} />
                            </div>
                            <div className="text-left">
                                <h3 className={`text-lg font-black tracking-tighter ${assignedBus.status === status.id ? status.color : 'text-foreground'
                                    }`}>
                                    {status.id.toUpperCase()}
                                </h3>
                                <p className="text-xs font-bold text-muted-foreground opacity-70">{status.desc}</p>
                            </div>
                        </div>
                        {assignedBus.status === status.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${status.color.replace('text-', 'bg-')}`}
                            >
                                <CheckCircle2 size={14} strokeWidth={3} />
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>

            <div className="mt-12 p-6 bg-driver-primary/5 border border-driver-primary/10 rounded-[2rem]">
                <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-driver-primary/10 rounded-xl flex items-center justify-center text-driver-primary">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-black text-sm tracking-tight text-driver-primary mb-1">Impact of Change</h4>
                        <p className="text-[10px] font-bold text-driver-primary/60 leading-relaxed uppercase tracking-widest">
                            Updating status will send push alerts to passengers on this route.
                        </p>
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default StatusUpdateScreen;
