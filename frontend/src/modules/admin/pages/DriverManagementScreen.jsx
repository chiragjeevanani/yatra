import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    User,
    ShieldCheck,
    Phone,
    Mail,
    LayoutGrid,
    List,
    Filter,
    MoreHorizontal,
    Star,
    Bus as BusIcon,
    AlertCircle
} from 'lucide-react';
import { MOCK_DRIVERS } from '../lib/mockData';
import { cn } from '../lib/utils';

const DriverManagementScreen = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const drivers = MOCK_DRIVERS.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground">Personnel Directory</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-[10px]">Manage driver registry and certification status</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-card border border-border rounded-xl p-1 flex gap-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                viewMode === 'grid' ? "bg-[#1E3A8A] text-white shadow-md" : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                viewMode === 'list' ? "bg-[#1E3A8A] text-white shadow-md" : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <List size={20} />
                        </button>
                    </div>
                    <button className="h-12 px-6 rounded-2xl bg-[#1E3A8A] text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-xl shadow-[#1E3A8A]/20 active:scale-95">
                        <Plus size={18} /> Add Driver
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border p-6 rounded-[2rem] shadow-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search drivers by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 bg-background border border-border rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-[#1E3A8A] transition-all"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <select className="h-12 px-4 bg-background border border-border rounded-2xl text-xs font-bold outline-none focus:border-[#1E3A8A] transition-all">
                        <option>All Status</option>
                        <option>On-Duty</option>
                        <option>Off-Duty</option>
                    </select>
                    <button className="h-12 w-12 rounded-2xl border border-border flex items-center justify-center text-muted-foreground hover:text-[#1E3A8A] transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Content View */}
            <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
                    >
                        {drivers.map((driver, i) => (
                            <motion.div
                                key={driver.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-card border border-border rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-[#1E3A8A] hover:text-white transition-all">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] p-1 shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.name}`}
                                                className="w-full h-full rounded-[1.8rem] bg-white object-cover"
                                                alt={driver.name}
                                            />
                                        </div>
                                        <div className={cn(
                                            "absolute -bottom-1 -right-1 w-6 h-6 rounded-lg border-4 border-card flex items-center justify-center shadow-lg",
                                            driver.status === 'On-Duty' ? "bg-emerald-500" : "bg-slate-400"
                                        )} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-black tracking-tighter">{driver.name}</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{driver.id}</p>
                                    </div>

                                    <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-[9px] font-black uppercase tracking-widest">
                                        <ShieldCheck size={12} className="text-blue-600" /> Authorized
                                    </div>

                                    <div className="w-full grid grid-cols-2 gap-3 pt-4">
                                        <div className="p-3 bg-muted/30 rounded-2xl border border-border/50 text-left">
                                            <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                                                <BusIcon size={12} />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Assigned</span>
                                            </div>
                                            <p className="text-xs font-black">{driver.assignedBus}</p>
                                        </div>
                                        <div className="p-3 bg-muted/30 rounded-2xl border border-border/50 text-left">
                                            <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                                                <Star size={12} />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Rating</span>
                                            </div>
                                            <p className="text-xs font-black">{driver.rating} / 5.0</p>
                                        </div>
                                    </div>

                                    <div className="w-full flex items-center justify-center gap-2 pt-2">
                                        <button className="flex-1 h-11 bg-[#1E3A8A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#1E3A8A]/10 hover:scale-105 active:scale-95 transition-all">
                                            Manage Duty
                                        </button>
                                        <button className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center text-muted-foreground hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                                            <Phone size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-card border border-border rounded-[2.5rem] shadow-sm overflow-hidden"
                    >
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-muted/10">
                                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Driver Profile</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Contact</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Current Duty</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Rating</th>
                                    <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {drivers.map((driver) => (
                                    <tr key={driver.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.name}`} alt="" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black tracking-tight">{driver.name}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{driver.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs font-bold">
                                                    <Phone size={12} className="text-muted-foreground" /> {driver.phone}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                                                    <Mail size={12} /> driver@yatra.com
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className={cn(
                                                    "inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest w-fit",
                                                    driver.status === 'On-Duty' ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-500/10 text-slate-500"
                                                )}>
                                                    <div className={cn("w-1.5 h-1.5 rounded-full", driver.status === 'On-Duty' ? "bg-emerald-500" : "bg-slate-500")} />
                                                    {driver.status}
                                                </span>
                                                <p className="text-xs font-bold tracking-tight pl-2">Bus {driver.assignedBus}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1">
                                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                                <span className="text-sm font-black tracking-tight">{driver.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1E3A8A] hover:text-white transition-all shadow-sm">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DriverManagementScreen;
