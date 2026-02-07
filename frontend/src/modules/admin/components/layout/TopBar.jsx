import React from 'react';
import { Search, Bell, User, LogOut, Settings } from 'lucide-react';
import { useAdmin } from '../../contexts/useAdmin';
import { motion } from 'framer-motion';

const TopBar = () => {
    const { admin, logout } = useAdmin();

    return (
        <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-[#1E3A8A] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search buses, drivers, routes..."
                        className="w-full h-11 bg-muted/50 border-transparent focus:bg-background focus:border-[#1E3A8A] rounded-2xl pl-12 pr-4 text-sm transition-all outline-none border-2"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="w-11 h-11 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-[#1E3A8A] transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
                </button>

                {/* Profile Toggle */}
                <div className="flex items-center gap-3 pl-4 border-l border-border ml-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black tracking-tight">{admin?.name || 'Admin User'}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{admin?.role || 'Super Admin'}</p>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] p-0.5 shadow-lg">
                        <img
                            src={admin?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'}
                            alt="Admin"
                            className="w-full h-full rounded-[0.9rem] object-cover bg-white"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
