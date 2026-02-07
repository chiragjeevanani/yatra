import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const MobileLayout = ({ children }) => {
    const location = useLocation();
    const fullscreenRoutes = ['/', '/onboarding', '/login', '/otp'];
    const isFullscreen = fullscreenRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-background flex flex-col relative max-w-md mx-auto shadow-2xl overflow-x-hidden">
            <main className={`flex-1 ${!isFullscreen ? 'pb-20' : ''}`}>
                {children}
            </main>
            {!isFullscreen && <BottomNavigation />}
        </div>
    );
};

export default MobileLayout;
