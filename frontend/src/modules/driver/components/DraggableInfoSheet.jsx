import React from 'react';
import { motion, useDragControls } from 'framer-motion';

const DraggableInfoSheet = ({ children }) => {
    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-border px-8 pb-12 pt-4 cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
        >
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-8" />
            {children}
        </motion.div>
    );
};

export default DraggableInfoSheet;
