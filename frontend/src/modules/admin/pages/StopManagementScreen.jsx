import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    MapPin,
    Navigation,
    MoreVertical,
    Edit,
    Trash2,
    ExternalLink,
    Map as MapIcon,
    Layers,
    Link as LinkIcon
} from 'lucide-react';
import { MOCK_STOPS } from '../lib/mockData';
import { cn } from '../lib/utils';

const StopManagementScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStop, setSelectedStop] = useState(MOCK_STOPS[0]);

    const stops = MOCK_STOPS.filter(stop =>
        stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stop.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground">Stop Management</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-[10px]">Configure geo-coordinates and station linking</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-12 px-6 rounded-2xl bg-[#1E3A8A] text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-xl shadow-[#1E3A8A]/20 active:scale-95">
                        <Plus size={18} /> Add New Stop
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: List and Management */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search stops by name or code..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 bg-background border border-border rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-[#1E3A8A] transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted/10">
                                        <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Stop Details</th>
                                        <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Coordinates</th>
                                        <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Routes</th>
                                        <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {stops.map((stop, i) => (
                                        <motion.tr
                                            key={stop.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => setSelectedStop(stop)}
                                            className={cn(
                                                "group cursor-pointer transition-all",
                                                selectedStop?.id === stop.id ? "bg-[#1E3A8A]/5" : "hover:bg-muted/30"
                                            )}
                                        >
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                                        selectedStop?.id === stop.id ? "bg-[#1E3A8A] text-white" : "bg-muted text-muted-foreground"
                                                    )}>
                                                        <MapPin size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black tracking-tight">{stop.name}</p>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stop.code}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <p className="text-xs font-bold text-muted-foreground tracking-tight">{stop.lat}, {stop.lng}</p>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex flex-wrap gap-1">
                                                    <span className="px-2 py-0.5 rounded-md bg-[#1E3A8A]/10 text-[#1E3A8A] text-[9px] font-black">
                                                        {stop.activeRoutes} Routes
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted text-muted-foreground hover:bg-[#1E3A8A] hover:text-white transition-all">
                                                        <Edit size={14} />
                                                    </button>
                                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted text-muted-foreground hover:bg-red-500 hover:text-white transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Preview & Details */}
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {selectedStop && (
                            <motion.div
                                key={selectedStop.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-6 sticky top-28"
                            >
                                {/* Mini Map Preview */}
                                <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-xl aspect-square relative group">
                                    {/* Simulated Map */}
                                    <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                        <div className="absolute inset-0 opacity-20 dark:opacity-10"
                                            style={{
                                                backgroundImage: `radial-gradient(#1E3A8A 1px, transparent 1px)`,
                                                backgroundSize: '30px 30px'
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping scale-[3]" />
                                                <div className="w-12 h-12 rounded-[1.5rem] bg-[#1E3A8A] shadow-2xl flex items-center justify-center text-white relative z-10 border-4 border-white dark:border-slate-800">
                                                    <MapPin size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Overlay Info */}
                                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                                        <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em]">
                                            Live Coordinates
                                        </div>
                                        <button className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#1E3A8A] pointer-events-auto hover:scale-110 transition-all active:scale-95">
                                            <ExternalLink size={20} />
                                        </button>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white pt-20">
                                        <h3 className="text-2xl font-black tracking-tighter mb-1">{selectedStop.name}</h3>
                                        <p className="text-xs font-bold text-white/60 tracking-widest uppercase">{selectedStop.code} Sector</p>
                                    </div>
                                </div>

                                {/* Station Configuration */}
                                <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                            <LinkIcon size={14} className="text-[#1E3A8A]" /> Network Links
                                        </h4>
                                        <button className="text-[10px] font-black text-[#1E3A8A] uppercase hover:underline">Configure</button>
                                    </div>

                                    <div className="space-y-4">
                                        {['Primary Hub', 'Verified Station', 'ADA Compliant'].map(tag => (
                                            <div key={tag} className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border/50">
                                                <span className="text-xs font-bold text-foreground">{tag}</span>
                                                <div className="w-10 h-6 bg-emerald-500 rounded-full relative p-1 flex items-center justify-end shadow-inner">
                                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full py-4 bg-[#1E3A8A] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#1E3A8A]/20 hover:scale-102 transition-all active:scale-98">
                                        Update Geo-Properties
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default StopManagementScreen;
