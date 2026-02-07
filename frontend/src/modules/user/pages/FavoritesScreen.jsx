import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FavoritesScreen = () => {
    const navigate = useNavigate();

    const favorites = [
        { id: 1, from: 'Home', to: 'Work', bus: 'B-124', frequency: 'Daily' },
        { id: 2, from: 'Gym', to: 'Home', bus: 'R-45', frequency: 'Mon-Fri' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background p-5">
            <div className="mb-8 pt-2">
                <h1 className="text-3xl font-black tracking-tighter mb-2">Saved Routes</h1>
                <p className="text-muted-foreground text-sm font-bold">Quickly access your most frequent trips.</p>
            </div>

            <div className="space-y-4">
                {favorites.length > 0 ? (
                    favorites.map((fav, i) => (
                        <motion.div
                            key={fav.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(`/route/${fav.id}`)}
                            className="bg-card border border-border rounded-3xl p-5 shadow-sm relative overflow-hidden group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                                    <Star size={20} className="fill-current" />
                                </div>
                                <button className="text-muted-foreground hover:text-destructive transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <div className="w-0.5 h-6 bg-muted-foreground/20 my-1" />
                                    <div className="w-2 h-2 rounded-full border-2 border-primary" />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <h4 className="text-sm font-black tracking-tight">{fav.from}</h4>
                                    <h4 className="text-sm font-black tracking-tight">{fav.to}</h4>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-primary px-2 py-0.5 bg-primary/10 rounded-md">BUS {fav.bus}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{fav.frequency}</span>
                                </div>
                                <button
                                    onClick={() => navigate('/search')}
                                    className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                                >
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-6">
                            <Star size={40} />
                        </div>
                        <h3 className="text-xl font-black tracking-tighter mb-2">No Saved Routes</h3>
                        <p className="text-muted-foreground text-sm max-w-[200px]">Save your frequent journeys here for easy access.</p>
                    </div>
                )}
            </div>

            <button className="mt-8 w-full h-14 border-2 border-dashed border-border rounded-2xl font-bold text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                + Add New Favorite
            </button>
        </div>
    );
};

export default FavoritesScreen;
