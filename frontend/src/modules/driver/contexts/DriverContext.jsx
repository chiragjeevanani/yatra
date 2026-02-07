import React, { createContext, useContext, useState, useEffect } from 'react';
import { useBusData } from '../../../contexts/BusDataProvider';

const DriverContext = createContext();

export const useDriver = () => {
    const context = useContext(DriverContext);
    if (!context) {
        throw new Error('useDriver must be used within a DriverProvider');
    }
    return context;
};

export const DriverProvider = ({ children }) => {
    const [driver, setDriver] = useState(() => {
        const saved = localStorage.getItem('yatra_driver_auth');
        return saved ? JSON.parse(saved) : null;
    });

    const [assignedBusId, setAssignedBusId] = useState('124'); // Default mock bus
    const { buses, updateBusStatus, updateTripStatus, updateBusLocation } = useBusData();
    const assignedBus = buses[assignedBusId];

    const login = (phone) => {
        const mockDriver = {
            id: 'DRV-001',
            name: 'Rajesh Kumar',
            phone: phone,
            employeeId: 'EMP78923',
            depot: 'Central Depot',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
        };
        setDriver(mockDriver);
        localStorage.setItem('yatra_driver_auth', JSON.stringify(mockDriver));
    };

    const logout = () => {
        setDriver(null);
        localStorage.removeItem('yatra_driver_auth');
    };

    const startTrip = () => {
        updateTripStatus(assignedBusId, 'Started');
        updateBusStatus(assignedBusId, 'On Time');
    };

    const endTrip = () => {
        updateTripStatus(assignedBusId, 'Ended');
    };

    const pauseTrip = () => {
        updateTripStatus(assignedBusId, 'Paused');
    };

    const updateStatus = (status) => {
        updateBusStatus(assignedBusId, status);
    };

    return (
        <DriverContext.Provider value={{
            driver,
            assignedBus,
            login,
            logout,
            startTrip,
            endTrip,
            pauseTrip,
            updateStatus
        }}>
            {children}
        </DriverContext.Provider>
    );
};
