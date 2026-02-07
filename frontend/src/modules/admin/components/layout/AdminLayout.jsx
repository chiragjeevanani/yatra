import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useAdmin } from '../../contexts/useAdmin';
import { motion } from 'framer-motion';

const AdminLayout = () => {
    const { isAuthenticated, isSidebarCollapsed } = useAdmin();

    // Protection logic
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Persistent Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <motion.div
                animate={{ paddingLeft: isSidebarCollapsed ? 80 : 260 }}
                className="flex-1 flex flex-col min-w-0 transition-all duration-200"
            >
                <TopBar />
                <main className="flex-1 overflow-x-hidden">
                    <Outlet />
                </main>
            </motion.div>
        </div>
    );
};

export default AdminLayout;
