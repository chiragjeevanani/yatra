import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from '../contexts/AdminContext';

// Lazy load admin screens
const LoginScreen = lazy(() => import('../pages/auth/LoginScreen'));
const DashboardScreen = lazy(() => import('../pages/DashboardScreen'));
const LiveTrackingScreen = lazy(() => import('../pages/LiveTrackingScreen'));
const BusManagementScreen = lazy(() => import('../pages/BusManagementScreen'));
const RouteManagementScreen = lazy(() => import('../pages/RouteManagementScreen'));
const StopManagementScreen = lazy(() => import('../pages/StopManagementScreen'));
const DriverManagementScreen = lazy(() => import('../pages/DriverManagementScreen'));
const ScheduleManagementScreen = lazy(() => import('../pages/ScheduleManagementScreen'));
const AlertsScreen = lazy(() => import('../pages/AlertsScreen'));
const ReportsScreen = lazy(() => import('../pages/ReportsScreen'));
const SettingsScreen = lazy(() => import('../pages/SettingsScreen'));

// Layout placeholder (will create this next)
import AdminLayout from '../components/layout/AdminLayout';

const AdminRoutes = () => {
    return (
        <AdminProvider>
            <Suspense fallback={
                <div className="h-screen w-screen flex items-center justify-center bg-background">
                    <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <Routes>
                    {/* Public Auth Route */}
                    <Route path="/login" element={<LoginScreen />} />

                    {/* Protected Admin Routes */}
                    <Route element={<AdminLayout />}>
                        <Route path="/dashboard" element={<DashboardScreen />} />
                        <Route path="/tracking" element={<LiveTrackingScreen />} />
                        <Route path="/buses" element={<BusManagementScreen />} />
                        <Route path="/routes" element={<RouteManagementScreen />} />
                        <Route path="/stops" element={<StopManagementScreen />} />
                        <Route path="/drivers" element={<DriverManagementScreen />} />
                        <Route path="/schedules" element={<ScheduleManagementScreen />} />
                        <Route path="/alerts" element={<AlertsScreen />} />
                        <Route path="/reports" element={<ReportsScreen />} />
                        <Route path="/settings" element={<SettingsScreen />} />

                        {/* Default admin redirect */}
                        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                    </Route>

                    {/* Catch all to login */}
                    <Route path="*" element={<Navigate to="/admin/login" replace />} />
                </Routes>
            </Suspense>
        </AdminProvider>
    );
};

export default AdminRoutes;
