import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Map, Star, LayoutGrid, ArrowRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import BusCard from '../components/BusCard';
import { useSimulation } from '../../../hooks/useSimulation';

const HomeScreen = () => {
    const navigate = useNavigate();

    const quickActions = [
        { icon: Zap, label: 'Fastest', color: 'bg-yellow-500', path: '/search' },
        { icon: Map, label: 'Explore', color: 'bg-blue-500', path: '/timetable' },
        { icon: Star, label: 'Saved', color: 'bg-emerald-500', path: '/favorites' },
        { icon: LayoutGrid, label: 'More', color: 'bg-purple-500', path: '/profile' },
    ];
    return (
        <div className="flex flex-col min-h-screen bg-background p-5 pb-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pt-2">
                <div>
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Good Morning,</h2>
                    <h1 className="text-3xl font-black tracking-tighter">Ready for Your Trip?</h1>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center border border-border overflow-hidden shadow-sm">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Search Section */}
            <div className="relative mb-10">
                <SearchBar />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-4 mb-10">
                {quickActions.map((item, i) => (
                    <motion.button
                        key={i}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(item.path)}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                            <item.icon size={24} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {item.label}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Nearby Buses */}
            <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black tracking-tight">Nearby Buses (Live)</h2>
                    <button
                        onClick={() => navigate('/timetable')}
                        className="text-sm font-bold text-primary flex items-center gap-1"
                    >
                        See All <ArrowRight size={14} />
                    </button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
                    {useSimulation(false).buses.map((bus, i) => (
                        <BusCard
                            key={i}
                            busNumber={bus.number}
                            routeName={bus.route || 'City Loop'}
                            eta={`${Math.floor(Math.random() * 15) + 2} mins`}
                            distance={`${(Math.random() * 2).toFixed(1)}km`}
                            status={bus.status === 'Active' ? 'On Time' : bus.status}
                            onClick={() => navigate(`/route/${bus.id}`)}
                        />
                    ))}
                    {useSimulation(false).buses.length === 0 && (
                        <p className="text-sm text-muted-foreground pl-1">Waiting for simulation to start...</p>
                    )}
                </div>
            </div>

            {/* Map Preview Card */}
            <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/track/124')}
                className="relative h-48 bg-muted rounded-3xl overflow-hidden shadow-sm border border-border group cursor-pointer"
            >
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/77.209,28.6139,12,0/600x400?access_token=pk.eyJ1IjoiY2hpcmFnajk5IiwiYSI6ImNrcXZoenR6bzBkMWkybm8yYjZyaGJ6YmoifQ')] bg-cover bg-center opacity-60 dark:opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-md rounded-xl shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live View</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                    <div className="w-full h-12 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg">
                        <Map size={18} /> Open Live Map
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomeScreen;
