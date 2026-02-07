# Yatra Simulation Showcase Guide

Follow these steps to demonstrate the real-time coordination between the Admin, Driver, and User applications.

## Prerequisite
Ensure the development server is running:
```bash
npm run dev
```

## Setup
Open three separate browser windows or tabs. Arrange them side-by-side if possible to see the real-time updates.

### Tab 1: Admin Dashboard (The Controller)
1. Navigate to: `http://localhost:5173/admin/login`
2. Login with: `admin@yatra-transit.com` / `admin123`
3. Go to the **Live Tracking** page via the sidebar.
   - **What happens:** This initiates the "Simulation Engine". You will see bus markers moving on the map.
   - *Note: Keep this tab open to keep the simulation running.*

### Tab 2: Driver App (The Operator)
1. Navigate to: `http://localhost:5173/driver/dashboard` (or login first if needed).
2. Look at the **Quick Updates** section.
3. **Action:** Click the **Mechanical Issue** button.
   - **What happens:** This triggers a "Breakdown" alert for Bus-001.

### Tab 3: User App (The Passenger)
1. Navigate to: `http://localhost:5173/user` (Home Screen).
2. Look at the **Nearby Buses** section.
   - **What happens:** You will see the buses listed dynamically.
   - **Verification:** After clicking "Mechanical Issue" in the Driver App, verify that the first bus card status changes (e.g., from "On Time" to "Breakdown/Delayed").

## Live Synchronization Flow
1. **Movement:** Watch the bus positions in the Admin map. They update every second.
2. **Alerts:** 
   - Triggers from Driver App -> Updates Admin "Alerts Panel" (if open) -> Updates User App bus status.
   - Try clicking **Report Delay** in the Driver App and watch the status change across apps.

## Troubleshooting
- If buses aren't moving, ensure the **Admin Tab** is open and active on the Live Tracking page.
- If tabs aren't syncing, refresh all three tabs.
