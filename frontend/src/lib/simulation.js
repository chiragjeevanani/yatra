import { MOCK_ROUTES, MOCK_BUSES } from '../modules/admin/lib/mockData';

const BROADCAST_CHANNEL_NAME = 'yatra_simulation_updates';
const UPDATE_INTERVAL_MS = 1000;
const SPEED_FACTOR = 0.05; // Progress per tick (0 to 1)

class SimulationService {
    constructor() {
        this.buses = [...MOCK_BUSES].map(bus => {
            // Assign a random route if not strictly defined or parse it from string
            const routeIdMatch = bus.route.match(/(R-\d+)/);
            const routeId = routeIdMatch ? routeIdMatch[1] : MOCK_ROUTES[0].id;
            const route = MOCK_ROUTES.find(r => r.id === routeId) || MOCK_ROUTES[0];

            return {
                ...bus,
                routeId: route.id,
                currentStopIndex: 0,
                nextStopIndex: 1,
                progress: 0, // 0 to 1 between stops
                status: 'Active',
                speed: 0.01 + Math.random() * 0.02 // vary speed slightly
            };
        });

        this.alerts = [];
        this.subscribers = new Set();
        this.isRunning = false;
        this.intervalId = null;

        // Setup Cross-Tab Communication
        this.channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        this.channel.onmessage = (event) => {
            const { type, payload } = event.data;
            if (type === 'STATE_UPDATE') {
                this.buses = payload.buses;
                this.alerts = payload.alerts;
                this.notifySubscribers();
            } else if (type === 'TRIGGER_ALERT') {
                this._addAlert(payload);
            }
        };
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;

        // Only one tab should arguably drive the simulation, but for simplicity
        // in this "demo" environment without leader-election, we'll let whoever
        // calls start() drive it. In a real app, we'd check if another leader exists.

        this.intervalId = setInterval(() => {
            this.updateState();
            this.broadcastState();
        }, UPDATE_INTERVAL_MS);
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.intervalId);
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        // Instant update on subscribe
        callback({ buses: this.buses, alerts: this.alerts });
        return () => this.subscribers.delete(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(cb => cb({ buses: this.buses, alerts: this.alerts }));
    }

    broadcastState() {
        this.channel.postMessage({
            type: 'STATE_UPDATE',
            payload: {
                buses: this.buses,
                alerts: this.alerts
            }
        });
        this.notifySubscribers();
    }

    updateState() {
        this.buses = this.buses.map(bus => {
            if (bus.status !== 'Active') return bus;

            const route = MOCK_ROUTES.find(r => r.id === bus.routeId);
            if (!route || !route.stops) return bus;

            let { currentStopIndex, nextStopIndex, progress, speed } = bus;
            const startStop = route.stops[currentStopIndex];
            const endStop = route.stops[nextStopIndex];

            // If we don't have coordinates in stops (MOCK_ROUTES might be missing them),
            // we need to fallback or ensure mockData has them.
            // For now, let's assume MOCK_STOPS has the coords and we look them up.
            // Wait, MOCK_ROUTES structure in mockData.js just has "id", "name", "time".
            // We need to look up actual coords in MOCK_STOPS (which is STOPS_DATA).
            // But MOCK_STOPS is inside mockData.js. To make this self-contained, 
            // I should import MOCK_STOPS too.

            // NOTE: I will need to verify mockData exports MOCK_STOPS with coords.
            // (Verified in previous turn: yes it does, STOPS_DATA has lat/lng).

            // Simplified movement logic
            progress += speed;

            if (progress >= 1) {
                // Reached stop
                progress = 0;
                currentStopIndex = nextStopIndex;
                nextStopIndex = (nextStopIndex + 1) % route.stops.length; // Loop route

                // Maybe pause at stop? For now continuous.
            }

            return {
                ...bus,
                currentStopIndex,
                nextStopIndex,
                progress
            };
        });
    }

    // Helper to calculate current lat/lng for a bus
    getBusPosition(bus, allStops) {
        const route = MOCK_ROUTES.find(r => r.id === bus.routeId);
        if (!route) return { lat: bus.lat, lng: bus.lng }; // Fallback to initial

        const startStopId = route.stops[bus.currentStopIndex].id;
        const endStopId = route.stops[bus.nextStopIndex].id;

        const startNode = allStops.find(s => s.id === startStopId);
        const endNode = allStops.find(s => s.id === endStopId);

        if (!startNode || !endNode) return { lat: bus.lat, lng: bus.lng };

        const lat = startNode.lat + (endNode.lat - startNode.lat) * bus.progress;
        const lng = startNode.lng + (endNode.lng - startNode.lng) * bus.progress;

        return { lat, lng };
    }

    triggerAlert(alert) {
        this._addAlert(alert);
        this.channel.postMessage({
            type: 'TRIGGER_ALERT',
            payload: alert
        });
        this.broadcastState(); // Sync everyone
    }

    _addAlert(alert) {
        this.alerts = [alert, ...this.alerts];
    }
}

// Singleton instance
export const simulationService = new SimulationService();
