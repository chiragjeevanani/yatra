import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, History, MapPin, Calendar, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravelHistoryScreen = () => {
    const navigate = useNavigate();

    const trips = [
        { id: 1, date: 'Oct 24, 2025', from: 'City Center', to: 'Airport', bus: 'B-124', fare: '₹40', status: 'Completed' },
        { id: 2, date: 'Oct 22, 2025', from: 'Central Mall', to: 'Old Town', bus: 'R-45', fare: '₹25', status: 'Completed' },
        { id: 3, date: 'Oct 20, 2025', from: 'Railway Station', to: 'Tech Park', bus: 'EX-10', fare: '₹60', status: 'Completed' },
        { id: 4, date: 'Oct 18, 2025', from: 'Suburb Square', to: 'Market St', bus: 'M-90', fare: '₹20', status: 'Completed' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background p-5 pt-8">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-3 bg-card border border-border rounded-2xl shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black tracking-tighter">Travel History</h1>
            </div>

            <div className="space-y-4">
                {trips.map((trip, i) => (
                    <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-card border border-border p-5 rounded-3xl shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase">Bus {trip.bus}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">{trip.date}</span>
                            </div>
                            <span className="text-lg font-black tracking-tighter text-foreground">{trip.fare}</span>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <span className="text-sm font-bold">{trip.from}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full border-2 border-primary" />
                                <span className="text-sm font-bold">{trip.to}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{trip.status}</span>
                            </div>
                            <button className="text-[10px] font-black text-primary uppercase tracking-widest">Download Receipt</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TravelHistoryScreen;
