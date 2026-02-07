import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Bell, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const NotificationsScreen = () => {
    const navigate = useNavigate();
    const notifications = [
        {
            id: 1,
            type: 'warning',
            title: 'Bus Delayed',
            message: 'Bus B-124 is currently running 10 minutes behind schedule due to heavy traffic on Grand Avenue.',
            time: '2 mins ago',
            unread: true
        },
        {
            id: 2,
            type: 'info',
            title: 'Arrival Reminder',
            message: 'Your saved bus R-45 is arriving at Central Mall stop in 5 minutes.',
            time: '15 mins ago',
            unread: true
        },
        {
            id: 3,
            type: 'success',
            title: 'Trip Completed',
            message: 'You have reached your destination. We hope you had a pleasant journey!',
            time: '1 hour ago',
            unread: false
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background p-5">
            <div className="flex items-center justify-between mb-8 pt-2">
                <h1 className="text-3xl font-black tracking-tighter">Notifications</h1>
                <button className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-lg">
                    Mark All Read
                </button>
            </div>

            <div className="space-y-4">
                {notifications.map((notif, i) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => navigate('/route/124')}
                        className={cn(
                            "p-5 rounded-3xl border transition-all relative overflow-hidden cursor-pointer active:scale-98",
                            notif.unread ? "bg-card border-primary/20 shadow-md" : "bg-muted/30 border-border opacity-70"
                        )}
                    >
                        {notif.unread && (
                            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </div>
                        )}

                        <div className="flex gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                                notif.type === 'warning' ? "bg-orange-500 text-white" :
                                    notif.type === 'success' ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
                            )}>
                                {notif.type === 'warning' && <AlertTriangle size={24} />}
                                {notif.type === 'success' && <CheckCircle2 size={24} />}
                                {notif.type === 'info' && <Bell size={24} />}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-sm font-black tracking-tight">{notif.title}</h3>
                                    <span className="text-[8px] font-bold text-muted-foreground uppercase">{notif.time}</span>
                                </div>
                                <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                                    {notif.message}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <button className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mx-auto hover:text-foreground transition-colors">
                    View Older Notifications <Clock size={14} />
                </button>
            </div>
        </div>
    );
};

export default NotificationsScreen;
