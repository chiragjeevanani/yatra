import React from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={() => navigate('/search')}
            className="bg-card shadow-xl rounded-3xl p-4 space-y-3 border border-border/50 cursor-pointer active:scale-[0.98] transition-all"
        >
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl">
                <MapPin size={20} className="text-secondary-foreground/50" />
                <input
                    type="text"
                    placeholder="Current Location"
                    className="bg-transparent border-none outline-none text-sm font-semibold flex-1 placeholder:text-muted-foreground/50"
                />
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl">
                <Navigation size={20} className="text-primary" />
                <input
                    type="text"
                    placeholder="Where to?"
                    className="bg-transparent border-none outline-none text-sm font-semibold flex-1 placeholder:text-muted-foreground/50"
                />
            </div>
        </motion.div>
    );
};

export default SearchBar;
