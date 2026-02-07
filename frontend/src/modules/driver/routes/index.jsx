import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy load driver screens
const SplashScreen = lazy(() => import('../pages/SplashScreen'));
const LoginScreen = lazy(() => import('../pages/LoginScreen'));
const OTPScreen = lazy(() => import('../pages/OTPScreen'));
const DashboardScreen = lazy(() => import('../pages/DashboardScreen'));
const LiveTrackingScreen = lazy(() => import('../pages/LiveTrackingScreen'));
const StatusUpdateScreen = lazy(() => import('../pages/StatusUpdateScreen'));
const NotificationsScreen = lazy(() => import('../pages/NotificationsScreen'));
const ProfileScreen = lazy(() => import('../pages/ProfileScreen'));
const SecurityScreen = lazy(() => import('../pages/SecurityScreen'));
const DutyPreferencesScreen = lazy(() => import('../pages/DutyPreferencesScreen'));
const SupportScreen = lazy(() => import('../pages/SupportScreen'));

import { DriverProvider } from '../contexts/DriverContext';

const DriverRoutes = () => {
    return (
        <DriverProvider>
            <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>}>
                <Routes>
                    <Route path="/" element={<SplashScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/otp" element={<OTPScreen />} />
                    <Route path="/dashboard" element={<DashboardScreen />} />
                    <Route path="/tracking" element={<LiveTrackingScreen />} />
                    <Route path="/status" element={<StatusUpdateScreen />} />
                    <Route path="/notifications" element={<NotificationsScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/profile/security" element={<SecurityScreen />} />
                    <Route path="/profile/preferences" element={<DutyPreferencesScreen />} />
                    <Route path="/profile/support" element={<SupportScreen />} />
                    {/* Fallback to splash */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </DriverProvider>
    );
};

export default DriverRoutes;
