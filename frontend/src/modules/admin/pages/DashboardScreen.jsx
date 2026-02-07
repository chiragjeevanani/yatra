import React from 'react';
import { motion } from 'framer-motion';
import {
    Bus,
    Users,
    Activity,
    AlertCircle,
    ArrowRight,
    TrendingUp,
    Calendar,
    Filter
} from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import { MOCK_STATS, MOCK_RIDERSHIP_DATA } from '../lib/mockData';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const DashboardScreen = () => {
    const kpiIcons = [Bus, Activity, Users, AlertCircle];

    return (
        <div className="p-8 space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground">Operational Overview</h1>
                    <p className="text-muted-foreground font-bold text-sm">Real-time transit system performance and health</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="h-11 px-4 rounded-2xl bg-card border border-border flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-muted transition-all">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="h-11 px-4 rounded-2xl bg-[#1E3A8A] text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-lg shadow-[#1E3A8A]/20">
                        <Filter size={16} /> Filters
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_STATS.map((stat, i) => (
                    <KPICard
                        key={i}
                        {...stat}
                        icon={kpiIcons[i]}
                        delay={i * 0.1}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 space-y-8"
                >
                    {/* Ridership Trends Chart */}
                    <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                                    <TrendingUp size={20} className="text-[#1E3A8A]" /> Ridership Trends
                                </h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Weekly passenger volume</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#1E3A8A]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">This Week</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Previous</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={MOCK_RIDERSHIP_DATA}>
                                    <defs>
                                        <linearGradient id="colorRiders" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888810" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#888888', fontSize: 10, fontWeight: 'bold' }}
                                        dy={15}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#888888', fontSize: 10, fontWeight: 'bold' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            borderRadius: '16px',
                                            border: '1px solid #e1e1e1',
                                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                                        }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="riders"
                                        stroke="#1E3A8A"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorRiders)"
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Secondary Metrics / Quick View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#1E3A8A] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Bus size={120} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-xl font-black tracking-tighter mb-2">Fleet Optimization</h4>
                                <p className="text-blue-100/70 text-sm font-bold leading-relaxed mb-6 italic uppercase tracking-widest text-[10px]">92% of fleet currently active</p>
                                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-white text-[#1E3A8A] px-5 py-3 rounded-xl hover:scale-105 transition-all active:scale-95">
                                    Analyze performance <ArrowRight size={14} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                        <div className="bg-emerald-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Users size={120} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-xl font-black tracking-tighter mb-2">Driver Roster</h4>
                                <p className="text-white/70 text-sm font-bold leading-relaxed mb-6 italic uppercase tracking-widest text-[10px]">All shifts assigned for today</p>
                                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-white text-emerald-600 px-5 py-3 rounded-xl hover:scale-105 transition-all active:scale-95">
                                    Manage drivers <ArrowRight size={14} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Feed & Alerts */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-8"
                >
                    <AlertsPanel />
                    <ActivityFeed />
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardScreen;
