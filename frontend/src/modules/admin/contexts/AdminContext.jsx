import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    // Lazy initialization for better persistence handling
    const [admin, setAdmin] = useState(() => {
        const stored = localStorage.getItem('yatra_admin');
        return stored ? JSON.parse(stored) : null;
    });

    // Derived state for authentication based on admin presence
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('yatra_admin');
    });

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const login = (email, password) => {
        // Validate credentials
        if (email === 'admin@yatra-transit.com' && password === 'admin123') {
            const mockAdmin = {
                id: 'ADM-001',
                name: 'Admin User',
                email: email,
                role: 'Super Admin',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
            };
            setAdmin(mockAdmin);
            setIsAuthenticated(true);
            localStorage.setItem('yatra_admin', JSON.stringify(mockAdmin));
            return true;
        }
        return false;
    };

    const logout = () => {
        setAdmin(null);
        setIsAuthenticated(false);
        localStorage.removeItem('yatra_admin');
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <AdminContext.Provider value={{
            admin,
            isAuthenticated,
            isSidebarCollapsed,
            login,
            logout,
            toggleSidebar
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContext };
