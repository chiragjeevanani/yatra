import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, CreditCard, History, Settings, LogOut, ChevronRight, HelpCircle } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const ProfileScreen = () => {
    const navigate = useNavigate();

    const menuItems = [
        { icon: History, label: 'Travel History', color: 'bg-blue-500/10 text-blue-500', path: '/profile/history' },
        { icon: CreditCard, label: 'Payment Methods', color: 'bg-emerald-500/10 text-emerald-500', path: '/profile/payment' },
        { icon: Shield, label: 'Privacy & Safety', color: 'bg-purple-500/10 text-purple-500', path: '/profile/privacy' },
        { icon: HelpCircle, label: 'Help & Support', color: 'bg-orange-500/10 text-orange-500', path: '/profile/help' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background p-5 pt-10">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-10">
                <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-[40px] bg-muted border-4 border-background shadow-xl overflow-hidden">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="User avatar"
                        />
                    </div>
                    <button className="absolute bottom-1 right-1 w-8 h-8 bg-primary text-white rounded-xl border-4 border-background flex items-center justify-center shadow-lg">
                        <Settings size={14} />
                    </button>
                </div>
                <h2 className="text-2xl font-black tracking-tighter">Felix Sanchez</h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">+91 98765 43210</p>
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-primary p-5 rounded-3xl text-primary-foreground shadow-lg shadow-primary/20">
                    <h3 className="text-lg font-black tracking-tighter mb-1">Yatra Plus</h3>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Active Member</p>
                </div>
                <div className="bg-card border border-border p-5 rounded-3xl shadow-sm">
                    <h3 className="text-lg font-black tracking-tighter mb-1 text-foreground">₹420.50</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Wallet Balance</p>
                </div>
            </div>

            {/* App Settings */}
            <div className="bg-card border border-border rounded-[32px] overflow-hidden mb-8 shadow-sm">
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                            <Settings size={20} />
                        </div>
                        <span className="text-sm font-black tracking-tight">Dark Mode</span>
                    </div>
                    <ThemeToggle />
                </div>

                {menuItems.map((item, i) => (
                    <button
                        key={i}
                        onClick={() => navigate(item.path)}
                        className="w-full p-4 border-b border-border/50 last:border-0 flex items-center justify-between hover:bg-muted/30 transition-colors active:bg-muted/50"
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.color)}>
                                <item.icon size={20} />
                            </div>
                            <span className="text-sm font-black tracking-tight">{item.label}</span>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" />
                    </button>
                ))}
            </div>

            {/* Logout */}
            <button
                onClick={() => navigate('/login')}
                className="w-full h-16 bg-muted text-destructive rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-destructive/10 transition-all border border-transparent hover:border-destructive/20"
            >
                <LogOut size={18} /> Logout Account
            </button>

            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] text-center mt-12 mb-8 opacity-50">
                Yatra App v1.0.4 — Build 2026
            </p>
        </div>
    );
};

export default ProfileScreen;
