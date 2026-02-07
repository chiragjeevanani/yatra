import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle, Phone, MessageSquare, AlertCircle, ChevronRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupportScreen = () => {
    const navigate = useNavigate();

    const links = [
        { label: 'Driver Manual', icon: FileText, desc: 'Operational Guidelines' },
        { label: 'Contact Depot', icon: Phone, desc: 'Central Dispatch Center' },
        { label: 'Technical Issue', icon: MessageSquare, desc: 'Report App Bugs' },
    ];

    return (
        <div className="min-h-screen bg-background p-5 pt-12 pb-12">
            <div className="flex items-center gap-4 mb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center active:scale-95 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black tracking-tighter">Help & Support</h1>
            </div>

            <div className="bg-driver-primary p-8 rounded-[2.5rem] text-driver-primary-foreground shadow-2xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <HelpCircle size={100} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-lg font-black tracking-tight mb-1">Driver Assistance</h2>
                    <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Always here for your safety</p>
                </div>
            </div>

            <div className="space-y-4">
                {links.map((link, i) => (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="w-full bg-card border border-border rounded-[2rem] p-6 flex items-center justify-between active:scale-98 transition-all"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground">
                                <link.icon size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-black text-sm tracking-tight">{link.label}</h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{link.desc}</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" />
                    </motion.button>
                ))}

                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full h-20 bg-red-500 text-white rounded-[2.5rem] shadow-xl shadow-red-500/20 flex items-center justify-center gap-4 mt-8 active:scale-95 transition-all border-4 border-red-400/30"
                >
                    <AlertCircle size={28} />
                    <span className="text-xl font-black tracking-tighter uppercase italic">Emergency SOS</span>
                </motion.button>
            </div>
        </div>
    );
};

export default SupportScreen;
