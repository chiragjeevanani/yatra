import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { cn } from '../lib/utils';

const DraggableBottomSheet = ({ children, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ y: "85%" }}
            animate={{ y: isOpen ? "10%" : "85%" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
                if (info.offset.y < -50) setIsOpen(true);
                if (info.offset.y > 50) setIsOpen(false);
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className={cn(
                "fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-border flex flex-col",
                className
            )}
            style={{ height: "90vh" }}
        >
            {/* Handle */}
            <div
                className="w-full h-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-20">
                {children}
            </div>
        </motion.div>
    );
};

export default DraggableBottomSheet;
