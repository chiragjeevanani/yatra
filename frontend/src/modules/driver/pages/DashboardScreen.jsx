import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Play, Pause, Square, AlertCircle, Bell, ChevronRight } from 'lucide-react';
import { useDriver } from '../contexts/DriverContext';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { useSimulation } from '../../../hooks/useSimulation';

const DashboardScreen = () => {
    const { driver, startTrip, pauseTrip, endTrip } = useDriver();
    const navigate = useNavigate();

    // Simulation Hook - Driver is an observer but can trigger formatted alerts
    const { buses, triggerAlert } = useSimulation(false);

    // Assign typical first bus to this driver for demo
    const assignedBus = buses[0] || {
        number: 'Loading...',
        route: 'Route 101',
        status: 'Offline',
        passengers: '-',
        eta: '-',
        nextStop: '-'
    };

    const handleAlert = (type, message) => {
        triggerAlert(type, assignedBus.id, message);
    };

    const stats = [
        { label: 'Trip ETA', value: '15m', icon: Clock, color: 'text-blue-500' }, // Mocking dynamic ETA for now
        { label: 'Passengers', value: '42', icon: Users, color: 'text-emerald-500' }, // Mocking count
        { label: 'Progress', value: `${Math.round((assignedBus.progress || 0) * 100)}%`, icon: MapPin, color: 'text-orange-500' },
    ];

    const isRunning = assignedBus.tripStatus === 'Started';
    const isPaused = assignedBus.tripStatus === 'Paused';

    return (
        <div className="min-h-screen bg-background p-5 pb-28">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pt-2">
                <div>
                    <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Active Duty</h2>
                    <h1 className="text-2xl font-black tracking-tighter">Hi, {driver?.name?.split(' ')[0]}</h1>
                </div>
                <button
                    onClick={() => navigate('/driver/notifications')}
                    className="w-12 h-12 rounded-2xl bg-muted/50 border border-border flex items-center justify-center relative active:scale-90 transition-transform"
                >
                    <Bell size={20} />
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-background rounded-full" />
                </button>
            </div>

            {/* Bus Info Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-driver-primary text-driver-primary-foreground p-6 rounded-[2.5rem] shadow-2xl mb-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7h2" />
                        <circle cx="7" cy="17" r="2" />
                        <circle cx="17" cy="17" r="2" />
                    </svg>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                            Bus {assignedBus.number}
                        </span>
                        <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/30 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {assignedBus.status}
                        </div>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter mb-1">{assignedBus.route}</h2>
                    <p className="text-blue-100/60 text-sm font-bold uppercase tracking-wider">Morning Shift • 08:00 - 16:00</p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-4 rounded-3xl shadow-sm">
                        <stat.icon size={18} className={`${stat.color} mb-3`} />
                        <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-sm font-black tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Trip Controls */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Trip Management</h3>

                {!isRunning && !isPaused ? (
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={startTrip}
                        className="w-full h-20 bg-driver-primary text-driver-primary-foreground rounded-[2rem] shadow-xl flex items-center justify-between px-8 group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500" />
                        <span className="text-xl font-black tracking-tighter z-10">START NEW TRIP</span>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center z-10">
                            <Play size={20} fill="white" />
                        </div>
                    </motion.button>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={isRunning ? pauseTrip : startTrip}
                            className={`h-20 rounded-[2rem] shadow-lg flex items-center justify-center gap-3 font-black text-lg tracking-tighter border-2 ${isRunning ? 'bg-amber-500 text-white border-amber-400' : 'bg-emerald-500 text-white border-emerald-400'
                                }`}
                        >
                            {isRunning ? (
                                <><Pause size={24} fill="white" /> PAUSE</>
                            ) : (
                                <><Play size={24} fill="white" /> RESUME</>
                            )}
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={endTrip}
                            className="h-20 bg-red-500 text-white rounded-[2rem] shadow-lg flex items-center justify-center gap-3 font-black text-lg tracking-tighter border-2 border-red-400"
                        >
                            <Square size={20} fill="white" /> END TRIP
                        </motion.button>
                    </div>
                )}
            </div>

            {/* Quick Updates List */}
            <div className="mt-10 space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Quick Updates</h3>
                    <ChevronRight size={14} className="text-muted-foreground" />
                </div>
                <div className="space-y-3">
                    <button
                        onClick={() => handleAlert('delay', 'Heavy traffic at intersection, +10m delay')}
                        className="w-full h-16 bg-card border border-border rounded-2xl flex items-center gap-4 px-6 active:scale-98 transition-all"
                    >
                        <div className={`w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center`}>
                            <Clock size={20} />
                        </div>
                        <span className="font-bold text-sm tracking-tight">Report Delay</span>
                    </button>

                    <button
                        onClick={() => handleAlert('breakdown', 'Engine overheating, stopping vehicle')}
                        className="w-full h-16 bg-card border border-border rounded-2xl flex items-center gap-4 px-6 active:scale-98 transition-all"
                    >
                        <div className={`w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center`}>
                            <AlertCircle size={20} />
                        </div>
                        <span className="font-bold text-sm tracking-tight">Mechanical Issue</span>
                    </button>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default DashboardScreen;
