import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, MessageSquare, Info, Clock, ChevronRight } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const NotificationsScreen = () => {
    const alerts = [
        {
            id: 1,
            type: 'emergency',
            title: 'Route Diversion',
            message: 'Emergency closure at Bridge Road. Use Bypass X-4 instead.',
            time: '5 min ago',
            read: false,
            icon: AlertTriangle,
            color: 'bg-red-500',
        },
        {
            id: 2,
            type: 'admin',
            title: 'Schedule Update',
            message: 'Your afternoon shift will now end at 4:30 PM.',
            time: '1 hour ago',
            read: true,
            icon: Info,
            color: 'bg-blue-500',
        },
        {
            id: 3,
            type: 'message',
            title: 'Message from Admin',
            message: 'Please report to the central depot after your current trip.',
            time: '3 hours ago',
            read: true,
            icon: MessageSquare,
            color: 'bg-emerald-500',
        }
    ];

    return (
        <div className="min-h-screen bg-background p-5 pb-28">
            <div className="flex items-center justify-between mb-8 pt-2">
                <h1 className="text-3xl font-black tracking-tighter">Alerts</h1>
                <button className="text-[10px] font-bold text-driver-primary uppercase tracking-widest bg-driver-primary/10 px-4 py-2 rounded-xl active:scale-95 transition-transform">
                    Mark All Read
                </button>
            </div>

            <div className="space-y-4">
                {alerts.map((alert, i) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-5 rounded-[2rem] border-2 transition-all relative overflow-hidden ${!alert.read ? 'bg-card border-driver-primary/20 shadow-lg' : 'bg-muted/30 border-transparent opacity-70'
                            }`}
                    >
                        {!alert.read && (
                            <div className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                            </div>
                        )}

                        <div className="flex gap-4">
                            <div className={`w-12 h-12 ${alert.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg`}>
                                <alert.icon size={24} className="text-white" />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-sm font-black tracking-tight uppercase leading-none">{alert.title}</h3>
                                    <div className="flex items-center gap-1 text-[8px] font-bold text-muted-foreground uppercase">
                                        <Clock size={10} /> {alert.time}
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-muted-foreground leading-relaxed pr-4">
                                    {alert.message}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center p-8 bg-muted/20 rounded-[2.5rem] border border-dashed border-border flex flex-col items-center">
                <Clock size={40} className="text-muted-foreground/30 mb-4" />
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Previous Alerts</h4>
                <p className="text-[10px] font-bold text-muted-foreground/60 mt-1 uppercase">No more alerts for today</p>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default NotificationsScreen;
