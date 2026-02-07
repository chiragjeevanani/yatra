import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Bell, UserCheck, AlertCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const SettingToggle = ({ icon: Icon, label, description, defaultChecked }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="p-5 flex items-center justify-between border-b border-border last:border-0">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <Icon size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-black tracking-tight">{label}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground leading-tight uppercase tracking-widest mt-0.5">{description}</p>
                </div>
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={cn(
                    "w-12 h-6 rounded-full p-1 transition-colors duration-200",
                    checked ? "bg-primary" : "bg-muted"
                )}
            >
                <motion.div
                    animate={{ x: checked ? 24 : 0 }}
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                />
            </button>
        </div>
    );
};

const PrivacySafetyScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-background p-5 pt-8">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-3 bg-card border border-border rounded-2xl shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black tracking-tighter">Privacy & Safety</h1>
            </div>

            <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm mb-8">
                <SettingToggle
                    icon={Shield}
                    label="Share Location"
                    description="Allow us to track your bus distance"
                    defaultChecked={true}
                />
                <SettingToggle
                    icon={Bell}
                    label="Safety Alerts"
                    description="Get notified about delays & hazards"
                    defaultChecked={true}
                />
                <SettingToggle
                    icon={UserCheck}
                    label="Show Profile"
                    description="Other users can see your status"
                    defaultChecked={false}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Emergency Actions</h3>
                <button className="w-full bg-destructive/10 text-destructive p-5 rounded-3xl flex items-center justify-between border border-destructive/20 group hover:bg-destructive hover:text-white transition-all">
                    <div className="flex items-center gap-4">
                        <AlertCircle size={24} />
                        <span className="font-black tracking-tight">SOS EMERGENCY</span>
                    </div>
                    <ChevronRight size={20} />
                </button>
                <button className="w-full bg-card border border-border p-5 rounded-3xl flex items-center justify-between shadow-sm">
                    <span className="font-black text-sm tracking-tight">Emergency Contacts</span>
                    <ChevronRight size={20} className="text-muted-foreground" />
                </button>
            </div>
        </div>
    );
};

export default PrivacySafetyScreen;
