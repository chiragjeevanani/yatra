import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Smartphone, Key, Fingerprint, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SecurityScreen = () => {
    const navigate = useNavigate();

    const options = [
        { label: 'Change Login PIN', icon: Key, value: 'Last changed 2 months ago' },
        { label: 'Two-Factor Auth', icon: Smartphone, value: 'Enabled' },
        { label: 'Biometric Login', icon: Fingerprint, value: 'Face ID Active' },
    ];

    return (
        <div className="min-h-screen bg-background p-5 pt-12">
            <div className="flex items-center gap-4 mb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center active:scale-95 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black tracking-tighter">Security & Access</h1>
            </div>

            <div className="bg-driver-primary p-8 rounded-[2.5rem] text-driver-primary-foreground shadow-2xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Shield size={100} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-lg font-black tracking-tight mb-1">System Integrity</h2>
                    <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Device is verified & secure</p>
                </div>
            </div>

            <div className="space-y-4">
                {options.map((opt, i) => (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="w-full bg-card border border-border rounded-[2rem] p-6 flex items-center justify-between active:scale-98 transition-all"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground">
                                <opt.icon size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-black text-sm tracking-tight">{opt.label}</h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{opt.value}</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" />
                    </motion.button>
                ))}
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-[2rem] border border-dashed border-border text-center">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-loose">
                    Your account is managed by the<br />
                    Fleet Administration Department.
                </p>
            </div>
        </div>
    );
};

export default SecurityScreen;
