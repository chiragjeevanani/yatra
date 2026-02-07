import { useState, useEffect } from 'react';
import { simulationService } from '../lib/simulation';
import { MOCK_STOPS } from '../modules/admin/lib/mockData';

export const useSimulation = (shouldDrive = false) => {
    const [buses, setBuses] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Subscribe to updates
        const unsubscribe = simulationService.subscribe((data) => {
            // Calculate actual positions before setting state
            // This is done here so the "View" logic (lat/lng interpolation) is separated from "State" logic (indices)
            const busesWithPos = data.buses.map(bus => {
                const pos = simulationService.getBusPosition(bus, MOCK_STOPS);
                return { ...bus, ...pos };
            });
            setBuses(busesWithPos);
            setAlerts(data.alerts);
        });

        if (shouldDrive) {
            simulationService.start();
        }

        return () => {
            unsubscribe();
            if (shouldDrive) {
                simulationService.stop();
            }
        };
    }, [shouldDrive]);

    const triggerAlert = (type, busId, message) => {
        simulationService.triggerAlert({
            id: Date.now(),
            type,
            priority: 'high',
            bus: busId,
            message,
            time: 'Just now'
        });
    };

    return {
        buses,
        alerts,
        triggerAlert
    };
};
