import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Settings2,
    CheckCircle2,
    XCircle,
    Bus as BusIcon,
    ArrowUpDown,
    Download
} from 'lucide-react';
import { MOCK_BUSES } from '../lib/mockData';
import { cn } from '../lib/utils';

const BusManagementScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    const buses = MOCK_BUSES.filter(bus =>
        bus.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.registration.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const toggleAll = () => {
        if (selectedRows.length === buses.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(buses.map(b => b.id));
        }
    };

    return (
        <div className="p-8 space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground">Bus Fleet</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-[10px]">Manage system assets and service status</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-12 px-6 rounded-2xl bg-card border border-border flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-muted transition-all active:scale-95 shadow-sm">
                        <Download size={16} /> Export
                    </button>
                    <button className="h-12 px-6 rounded-2xl bg-[#1E3A8A] text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-xl shadow-[#1E3A8A]/20 active:scale-95">
                        <Plus size={18} /> Add New Bus
                    </button>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-card border border-border rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
                {/* Table Controls */}
                <div className="p-6 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search by bus number or registration..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 bg-background border border-border rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-[#1E3A8A] transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="h-12 w-12 rounded-2xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-[#1E3A8A] transition-all">
                            <Filter size={18} />
                        </button>
                        <button className="h-12 w-12 rounded-2xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-[#1E3A8A] transition-all">
                            <Settings2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/10">
                                <th className="px-6 py-5 text-left w-12">
                                    <div
                                        onClick={toggleAll}
                                        className={cn(
                                            "w-5 h-5 rounded-md border-2 cursor-pointer flex items-center justify-center transition-all",
                                            selectedRows.length === buses.length ? "bg-[#1E3A8A] border-[#1E3A8A]" : "border-border hover:border-[#1E3A8A]"
                                        )}
                                    >
                                        {selectedRows.length === buses.length && <div className="w-2 h-2 bg-white rounded-sm" />}
                                    </div>
                                </th>
                                <th className="px-6 py-5 text-left">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        Bus Details <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-6 py-5 text-left">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        Active Route
                                    </div>
                                </th>
                                <th className="px-6 py-5 text-left">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        Current Driver
                                    </div>
                                </th>
                                <th className="px-6 py-5 text-left">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        Status
                                    </div>
                                </th>
                                <th className="px-6 py-5 text-right">
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pr-4">
                                        Actions
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {buses.map((bus, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={bus.id}
                                    className={cn(
                                        "group hover:bg-muted/30 transition-colors",
                                        selectedRows.includes(bus.id) ? "bg-[#1E3A8A]/5 shadow-inner" : ""
                                    )}
                                >
                                    <td className="px-6 py-6">
                                        <div
                                            onClick={() => toggleRow(bus.id)}
                                            className={cn(
                                                "w-5 h-5 rounded-md border-2 cursor-pointer flex items-center justify-center transition-all",
                                                selectedRows.includes(bus.id) ? "bg-[#1E3A8A] border-[#1E3A8A]" : "border-border group-hover:border-[#1E3A8A]"
                                            )}
                                        >
                                            {selectedRows.includes(bus.id) && <div className="w-2 h-2 bg-white rounded-sm" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A]">
                                                <BusIcon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black tracking-tight">{bus.number}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{bus.registration}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500/30" />
                                            <span className="text-xs font-bold tracking-tight">{bus.route}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-xs font-bold tracking-tight">{bus.driver}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                            bus.status === 'Active' ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                                        )}>
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                bus.status === 'Active' ? "bg-emerald-500" : "bg-red-500"
                                            )} />
                                            {bus.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted text-muted-foreground hover:bg-[#1E3A8A] hover:text-white transition-all shadow-sm">
                                                <Edit size={14} />
                                            </button>
                                            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted text-muted-foreground hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                                <Trash2 size={14} />
                                            </button>
                                            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-white transition-all shadow-sm">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-border bg-muted/10 flex items-center justify-between">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Showing <span className="text-foreground">{buses.length}</span> of <span className="text-foreground">24</span> buses
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="h-10 px-4 rounded-xl border border-border bg-background text-[10px] font-black uppercase tracking-widest disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <div className="flex items-center gap-1 mx-2">
                            <span className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center text-[10px] font-black">1</span>
                            <span className="w-8 h-8 rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted flex items-center justify-center text-[10px] font-black cursor-pointer">2</span>
                        </div>
                        <button className="h-10 px-4 rounded-xl border border-border bg-background text-[10px] font-black uppercase tracking-widest">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusManagementScreen;
