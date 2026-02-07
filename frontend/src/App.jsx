import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './modules/user/contexts/ThemeContext';
import { BusDataProvider } from './contexts/BusDataProvider';
import UserRoutes from './modules/user/routes';
import DriverRoutes from './modules/driver/routes';
import AdminRoutes from './modules/admin/routes';
import { Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <BusDataProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* User Module Routes */}
            <Route path="/*" element={<UserRoutes />} />

            {/* Driver Module Routes */}
            <Route path="/driver/*" element={<DriverRoutes />} />

            {/* Admin Module Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </BusDataProvider>
  );
}

export default App;
