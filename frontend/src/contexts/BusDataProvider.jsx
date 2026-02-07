import React, { createContext, useContext, useState, useEffect } from 'react';

const BusDataContext = createContext();

export const useBusData = () => {
    const context = useContext(BusDataContext);
    if (!context) {
        throw new Error('useBusData must be used within a BusDataProvider');
    }
    return context;
};

export const BusDataProvider = ({ children }) => {
    // Initial state with some mock data
    const [buses, setBuses] = useState(() => {
        const saved = localStorage.getItem('yatra_buses_data');
        return saved ? JSON.parse(saved) : {
            '124': {
                id: '124',
                number: 'B-124',
                route: 'City Center - Airport',
                status: 'On Time', // On Time, Delayed, Breakdown, Off Duty
                tripStatus: 'Idle', // Idle, Started, Paused, Ended
                location: { lat: 28.6139, lng: 77.2090 },
                lastUpdate: new Date().toISOString(),
                passengers: 12,
                nextStop: 'Old Town Market',
                eta: '4 mins'
            }
        };
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('yatra_buses_data', JSON.stringify(buses));
    }, [buses]);

    // Location simulation logic
    useEffect(() => {
        let interval;
        const activeTripBusId = Object.keys(buses).find(id => buses[id].tripStatus === 'Started');

        if (activeTripBusId) {
            interval = setInterval(() => {
                setBuses(prev => {
                    const bus = prev[activeTripBusId];
                    if (!bus) return prev;

                    // Simple linear movement simulation for demo
                    const newLocation = {
                        lat: bus.location.lat + (Math.random() - 0.5) * 0.001,
                        lng: bus.location.lng + (Math.random() - 0.5) * 0.001
                    };

                    return {
                        ...prev,
                        [activeTripBusId]: {
                            ...bus,
                            location: newLocation,
                            lastUpdate: new Date().toISOString()
                        }
                    };
                });
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [buses]);

    const updateBusLocation = (busId, location) => {
        setBuses(prev => ({
            ...prev,
            [busId]: {
                ...prev[busId],
                location,
                lastUpdate: new Date().toISOString()
            }
        }));
    };

    const updateBusStatus = (busId, status) => {
        setBuses(prev => ({
            ...prev,
            [busId]: {
                ...prev[busId],
                status,
                lastUpdate: new Date().toISOString()
            }
        }));
    };

    const updateTripStatus = (busId, tripStatus) => {
        setBuses(prev => ({
            ...prev,
            [busId]: {
                ...prev[busId],
                tripStatus,
                lastUpdate: new Date().toISOString()
            }
        }));
    };

    const updateBusDetails = (busId, details) => {
        setBuses(prev => ({
            ...prev,
            [busId]: {
                ...prev[busId],
                ...details,
                lastUpdate: new Date().toISOString()
            }
        }));
    };

    return (
        <BusDataContext.Provider value={{ buses, updateBusLocation, updateBusStatus, updateTripStatus, updateBusDetails }}>
            {children}
        </BusDataContext.Provider>
    );
};
