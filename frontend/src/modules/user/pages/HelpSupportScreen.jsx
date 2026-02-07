import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Phone, Mail, ChevronRight, HelpCircle, FileText, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpSupportScreen = () => {
    const navigate = useNavigate();

    const categories = [
        { icon: HelpCircle, label: 'General FAQ', color: 'text-blue-500' },
        { icon: FileText, label: 'Terms of Use', color: 'text-purple-500' },
        { icon: Globe, label: 'Legal Policies', color: 'text-emerald-500' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background p-5 pt-8">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-3 bg-card border border-border rounded-2xl shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black tracking-tighter">Help & Support</h1>
            </div>

            {/* Quick Support Card */}
            <div className="bg-card border border-border p-6 rounded-[40px] shadow-sm mb-10 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-[28px] flex items-center justify-center text-primary mx-auto mb-4">
                    <MessageSquare size={32} />
                </div>
                <h2 className="text-xl font-black tracking-tighter mb-2">Live Support</h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed mb-6"> Our team is available 24/7 to help you with your journey. </p>
                <button className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20">
                    Chat with Us
                </button>
            </div>

            {/* Support Links */}
            <div className="space-y-3">
                {categories.map((cat, i) => (
                    <button
                        key={i}
                        className="w-full p-5 bg-card border border-border rounded-3xl flex items-center justify-between hover:bg-muted/30 transition-all active:scale-98 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <cat.icon size={20} className={cat.color} />
                            <span className="font-black text-sm tracking-tight">{cat.label}</span>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" />
                    </button>
                ))}
            </div>

            {/* Contact Info */}
            <div className="mt-12 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Other Ways to Reach Us</h4>
                <div className="flex gap-3">
                    <button className="flex-1 h-14 bg-muted/50 rounded-2xl flex items-center justify-center gap-2 border border-border">
                        <Phone size={18} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Call</span>
                    </button>
                    <button className="flex-1 h-14 bg-muted/50 rounded-2xl flex items-center justify-center gap-2 border border-border">
                        <Mail size={18} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Email</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpSupportScreen;
