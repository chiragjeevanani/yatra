import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Navigation,
    MoreVertical,
    Edit,
    Trash2,
    Settings2,
    Bus as BusIcon,
    ArrowUpDown,
    Download,
    Filter,
    CheckCircle2,
    XCircle,
    MapPin,
    Users,
    Calendar,
    Bell,
    TrendingUp,
    AlertTriangle,
    BarChart3,
    PieChart as PieIcon,
    LineChart as LineIcon,
    Cpu,
    Shield,
    Globe,
    Zap,
    Lock,
    Save,
    Map
} from 'lucide-react';
import { useAdmin } from '../../contexts/useAdmin';
import { MOCK_BUSES, MOCK_ROUTES, MOCK_STOPS, MOCK_DRIVERS, MOCK_SCHEDULES, MOCK_ALERTS } from '../lib/mockData';
import { cn } from '../lib/utils';

// This is a verification component to ensure all icons are loaded and the theme works
// Not intended for production routing, just for my internal check
const DependencyManifest = () => {
    return (
        <div className="p-8 space-y-4">
            <h2 className="text-2xl font-black">Admin Foundation Verified</h2>
            <div className="grid grid-cols-4 gap-4">
                {[Plus, Search, Navigation, BusIcon, MapPin, Users, Calendar, Bell, TrendingUp, AlertTriangle, BarChart3, PieIcon, Cpu, Shield, Globe, Zap, Lock, Save, Map].map((Icon, i) => (
                    <div key={i} className="p-4 bg-muted border border-border rounded-xl">
                        <Icon size={24} className="text-[#1E3A8A]" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DependencyManifest;
