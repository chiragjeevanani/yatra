/**
 * Mock data for the Admin Dashboard simulation
 */

export const MOCK_STATS = [
    { label: 'Total Buses', value: '24', trend: '+2', trendType: 'up' },
    { label: 'Active Trips', value: '18', trend: '+5', trendType: 'up' },
    { label: 'Drivers on Duty', value: '22', trend: '0', trendType: 'neutral' },
    { label: 'Delayed Buses', value: '3', trend: '+1', trendType: 'down' },
];

export const MOCK_BUSES = [
    { id: 'BUS-001', number: 'B-124', registration: 'MH-12-AB-1234', route: 'R-101 (Deccan - Hadapsar)', status: 'Active', driver: 'Rajesh Kumar', lat: 18.5204, lng: 73.8567 },
    { id: 'BUS-002', number: 'B-125', registration: 'MH-12-AB-5678', route: 'R-102 (Katraj - Shivajinagar)', status: 'Active', driver: 'Suresh Patil', lat: 18.5304, lng: 73.8467 },
    { id: 'BUS-003', number: 'B-130', registration: 'MH-12-CD-9012', route: 'R-105 (Kothrud - Wagholi)', status: 'Maintenance', driver: '-', lat: 18.5104, lng: 73.8367 },
    { id: 'BUS-004', number: 'B-142', registration: 'MH-12-EF-3456', route: 'R-108 (Warje - Hinjewadi)', status: 'Active', driver: 'Amit Deshmukh', lat: 18.5404, lng: 73.8667 },
    { id: 'BUS-005', number: 'B-150', registration: 'MH-12-GH-7890', route: 'R-110 (Aundh - Viman Nagar)', status: 'Active', driver: 'Vijay Shinde', lat: 18.5504, lng: 73.8767 },
];

// Expanded nested structure for detail views
const STOPS_DATA = [
    { id: 'S-01', name: 'Deccan Gymkhana', code: 'DEC-01', lat: 18.5173, lng: 73.8415, activeRoutes: 5, passengers: 'High' },
    { id: 'S-02', name: 'Pune Station', code: 'PUN-02', lat: 18.5284, lng: 73.8739, activeRoutes: 8, passengers: 'Very High' },
    { id: 'S-03', name: 'Swargate', code: 'SWA-03', lat: 18.5018, lng: 73.8636, activeRoutes: 12, passengers: 'Extreme' },
    { id: 'S-04', name: 'Shivajinagar', code: 'SHI-04', lat: 18.5309, lng: 73.8472, activeRoutes: 6, passengers: 'High' },
    { id: 'S-05', name: 'Nal Stop', code: 'NAL-05', lat: 18.5102, lng: 73.8329, activeRoutes: 4, passengers: 'Medium' },
];

export const MOCK_STOPS = STOPS_DATA;

export const MOCK_ROUTES = [
    {
        id: 'R-101',
        name: 'Deccan - Hadapsar',
        code: '101',
        totalTime: '55m',
        distance: '15.5 km',
        stops: [
            { id: 'S-01', name: 'Deccan Gymkhana', time: '07:00', code: 'DEC-01' },
            { id: 'S-05', name: 'Nal Stop', time: '07:12', code: 'NAL-05' },
            { id: 'S-03', name: 'Swargate', time: '07:25', code: 'SWA-03' },
            { id: 'S-12', name: 'Fatima Nagar', time: '07:40', code: 'FAT-12' },
            { id: 'S-20', name: 'Hadapsar Gadital', time: '07:55', code: 'HAD-20' },
        ]
    },
    {
        id: 'R-102',
        name: 'Katraj - Shivajinagar',
        code: '102',
        totalTime: '45m',
        distance: '22.0 km',
        stops: [
            { id: 'S-30', name: 'Katraj Zoo', time: '08:00', code: 'KAT-30' },
            { id: 'S-03', name: 'Swargate', time: '08:20', code: 'SWA-03' },
            { id: 'S-01', name: 'Deccan Gymkhana', time: '08:35', code: 'DEC-01' },
            { id: 'S-04', name: 'Shivajinagar', time: '08:45', code: 'SHI-04' },
        ]
    },
];

export const MOCK_RIDERSHIP_DATA = [
    { name: 'Mon', riders: 4000 },
    { name: 'Tue', riders: 3000 },
    { name: 'Wed', riders: 2000 },
    { name: 'Thu', riders: 2780 },
    { name: 'Fri', riders: 1890 },
    { name: 'Sat', riders: 2390 },
    { name: 'Sun', riders: 3490 },
];

export const MOCK_ALERTS = [
    { id: 1, type: 'delay', priority: 'medium', bus: 'B-124', message: '15 min delay on Route R-101 due to traffic.', time: '5 min ago' },
    { id: 2, type: 'breakdown', priority: 'high', bus: 'B-130', message: 'Engine failure reported near University Flyover.', time: '12 min ago' },
    { id: 3, type: 'emergency', priority: 'high', bus: 'B-142', message: 'Medical emergency reported by driver Rajesh.', time: '15 min ago' },
];

export const MOCK_DRIVERS = [
    { id: 'DRV-001', name: 'Rajesh Kumar', status: 'On Duty', bus: 'B-124', phone: '+91 9876543210', experience: '5 yrs', rating: 4.8 },
    { id: 'DRV-002', name: 'Suresh Patil', status: 'On Duty', bus: 'B-125', phone: '+91 9876543211', experience: '8 yrs', rating: 4.9 },
    { id: 'DRV-003', name: 'Amit Deshmukh', status: 'Break', bus: '-', phone: '+91 9876543212', experience: '3 yrs', rating: 4.5 },
    { id: 'DRV-004', name: 'Vijay Shinde', status: 'Off Duty', bus: '-', phone: '+91 9876543213', experience: '6 yrs', rating: 4.7 },
];

export const MOCK_SCHEDULES = [
    { id: 'SCH-001', route: 'R-101', time: '06:00 AM', frequency: 'Every 15 mins', bus: 'B-124', status: 'active' },
    { id: 'SCH-002', route: 'R-102', time: '06:15 AM', frequency: 'Every 20 mins', bus: 'B-125', status: 'active' },
];
