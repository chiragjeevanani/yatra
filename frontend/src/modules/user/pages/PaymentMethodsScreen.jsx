import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Plus, Wallet, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentMethodsScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-background p-5 pt-8">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-3 bg-card border border-border rounded-2xl shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black tracking-tighter">Payment</h1>
            </div>

            {/* Wallet Section */}
            <div className="bg-primary text-primary-foreground p-6 rounded-[40px] shadow-xl shadow-primary/20 mb-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Wallet size={120} />
                </div>
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Current Balance</p>
                    <h2 className="text-4xl font-black tracking-tighter mb-8">₹420.50</h2>
                    <button className="px-6 py-2.5 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">
                        + Add Credits
                    </button>
                </div>
            </div>

            {/* Saved Cards */}
            <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Saved Cards</h3>
                    <button className="text-primary p-2">
                        <Plus size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-card border-2 border-primary/20 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                                <CreditCard size={24} className="text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black">•••• •••• •••• 4242</h4>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Exp 12/28</p>
                            </div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                    </div>

                    <button className="w-full h-16 border-2 border-dashed border-border rounded-3xl flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all font-bold">
                        <Plus size={20} /> Add New Method
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto py-8">
                <div className="bg-muted/30 p-4 rounded-2xl flex items-center gap-3 border border-border">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <p className="text-[10px] font-bold text-muted-foreground leading-tight uppercase tracking-widest">
                        Your payment information is encrypted and securely stored.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodsScreen;
