import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Map,
    Bus,
    Route,
    MapPin,
    Users,
    Calendar,
    Bell,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    BusFront
} from 'lucide-react';
import { useAdmin } from '../../contexts/useAdmin';
import { cn } from '../../lib/utils';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Live Tracking', icon: Map, path: '/admin/tracking' },
    { label: 'Buses', icon: Bus, path: '/admin/buses' },
    { label: 'Routes', icon: Route, path: '/admin/routes' },
    { label: 'Stops', icon: MapPin, path: '/admin/stops' },
    { label: 'Drivers', icon: Users, path: '/admin/drivers' },
    { label: 'Schedules', icon: Calendar, path: '/admin/schedules' },
    { label: 'Alerts', icon: Bell, path: '/admin/alerts' },
    { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

const Sidebar = () => {
    const { isSidebarCollapsed, toggleSidebar } = useAdmin();
    const location = useLocation();

    return (
        <motion.aside
            animate={{ width: isSidebarCollapsed ? 80 : 260 }}
            className="fixed left-0 top-0 h-screen bg-[#1E3A8A] text-white flex flex-col z-50 shadow-2xl overflow-hidden"
        >
            {/* Logo Section */}
            <div className="h-20 flex items-center px-6 relative border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                        <BusFront className="text-[#1E3A8A]" size={24} strokeWidth={2.5} />
                    </div>
                    {!isSidebarCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-black text-xl tracking-tighter"
                        >
                            Yatra Admin
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-4 px-3 py-3.5 rounded-2xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-white text-[#1E3A8A] font-bold shadow-lg"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon size={22} className={cn("shrink-0", isActive ? "text-[#1E3A8A]" : "")} />
                            {!isSidebarCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm tracking-tight whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {isActive && !isSidebarCollapsed && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 w-1.5 h-6 bg-[#162a63] rounded-r-full"
                                />
                            )}
                            {isSidebarCollapsed && isActive && (
                                <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />
                            )}
                        </NavLink>
                    );
                })}
            </div>

            {/* Collapse Toggle */}
            <div className="p-4 border-t border-white/10 shrink-0">
                <button
                    onClick={toggleSidebar}
                    className="w-full flex items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                    {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
