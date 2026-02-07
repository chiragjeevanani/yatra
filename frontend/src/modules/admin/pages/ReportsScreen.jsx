import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    PieChart as PieIcon,
    TrendingUp,
    Download,
    Calendar,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    ChevronDown,
    Map,
    Users,
    Bus
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    LineChart,
    Line,
    Legend
} from 'recharts';
import { cn } from '../lib/utils';

const COLORS = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

const ridershipData = [
    { name: 'Mon', count: 4200 },
    { name: 'Tue', count: 3800 },
    { name: 'Wed', count: 4500 },
    { name: 'Thu', count: 4100 },
    { name: 'Fri', count: 5200 },
    { name: 'Sat', count: 2800 },
    { name: 'Sun', count: 2100 },
];

const routePerformance = [
    { name: 'Route R-101', value: 35 },
    { name: 'Route R-102', value: 25 },
    { name: 'Route R-105', value: 20 },
    { name: 'Route R-201', value: 15 },
    { name: 'Others', value: 5 },
];

const delayStats = [
    { time: '06AM', delay: 2 },
    { time: '09AM', delay: 15 },
    { time: '12PM', delay: 5 },
    { time: '03PM', delay: 8 },
    { time: '06PM', delay: 22 },
    { time: '09PM', delay: 4 },
];

const ReportsScreen = () => {
    return (
        <div className="p-8 space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-foreground">Analytics Engine</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest text-[10px]">Strategic insights and fleet utilization data</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-12 px-6 rounded-2xl bg-card border border-border flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-muted transition-all active:scale-95 shadow-sm">
                        <Calendar size={18} /> Aug 1 - Aug 31
                    </button>
                    <button className="h-12 px-6 rounded-2xl bg-[#1E3A8A] text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#1E3A8A]/90 transition-all shadow-xl shadow-[#1E3A8A]/20 active:scale-95">
                        <Download size={18} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Ridership', value: '124,802', trend: '+12%', icon: Users, color: 'text-blue-600' },
                    { label: 'On-Time Performance', value: '88.4%', trend: '-2.4%', icon: TrendingUp, color: 'text-emerald-600' },
                    { label: 'Fuel Efficiency', value: '4.2 km/L', trend: '+5%', icon: Bus, color: 'text-amber-600' },
                    { label: 'Active Routes', value: '18', trend: '0%', icon: Map, color: 'text-[#1E3A8A]' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border border-border p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50", stat.color)}>
                                <stat.icon size={20} />
                            </div>
                            <span className={cn(
                                "text-[10px] font-black uppercase flex items-center gap-1",
                                stat.trend.startsWith('+') ? "text-emerald-600" : stat.trend === '0%' ? "text-muted-foreground" : "text-red-500"
                            )}>
                                {stat.trend.startsWith('+') ? <ArrowUpRight size={12} /> : stat.trend === '0%' ? null : <ArrowDownRight size={12} />}
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black tracking-tighter">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart: Weekly Ridership */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black tracking-tight">Weekly Ridership</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Passenger count by day</p>
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1E3A8A] hover:text-white transition-all">
                            <BarChart3 size={18} />
                        </button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ridershipData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888810" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#888888', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#888888', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#88888810' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" fill="#1E3A8A" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pie Chart: Route Performance */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black tracking-tight">Route Distribution</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Market share per route</p>
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1E3A8A] hover:text-white transition-all">
                            <PieIcon size={18} />
                        </button>
                    </div>
                    <div className="h-[300px] w-full flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={routePerformance}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {routePerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{ paddingLeft: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Line Chart: Delay Analysis */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-card border border-border rounded-[2.5rem] p-8 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black tracking-tight">Service Lag Monitoring</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">System-wide delay frequency (avg mins)</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-muted text-muted-foreground text-[10px] font-black uppercase rounded-xl hover:bg-[#1E3A8A] hover:text-white transition-all">Peak Hours</button>
                            <button className="px-4 py-2 bg-muted text-muted-foreground text-[10px] font-black uppercase rounded-xl hover:bg-[#1E3A8A] hover:text-white transition-all">Off-peak</button>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={delayStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888810" />
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#888888', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#888888', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="delay"
                                    stroke="#EF4444"
                                    strokeWidth={4}
                                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 6, stroke: '#fff' }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ReportsScreen;
