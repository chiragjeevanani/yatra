import React from 'react';

const placeholderPages = [
    'LiveTrackingScreen',
    'BusManagementScreen',
    'RouteManagementScreen',
    'StopManagementScreen',
    'DriverManagementScreen',
    'ScheduleManagementScreen',
    'AlertsScreen',
    'ReportsScreen',
    'SettingsScreen'
];

export default function GenericPlaceholder({ name }) {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6">{name}</h1>
            <p className="text-muted-foreground">This module is currently being implemented.</p>
        </div>
    );
}
