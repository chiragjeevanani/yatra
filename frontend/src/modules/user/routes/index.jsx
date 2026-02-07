import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from '../components/MobileLayout';

// Lazy loading screens
const SplashScreen = lazy(() => import('../pages/SplashScreen'));
const OnboardingScreen = lazy(() => import('../pages/OnboardingScreen'));
const LoginScreen = lazy(() => import('../pages/LoginScreen'));
const OTPScreen = lazy(() => import('../pages/OTPScreen'));
const HomeScreen = lazy(() => import('../pages/HomeScreen'));
const SearchResultsScreen = lazy(() => import('../pages/SearchResultsScreen'));
const RouteDetailsScreen = lazy(() => import('../pages/RouteDetailsScreen'));
const LiveTrackingScreen = lazy(() => import('../pages/LiveTrackingScreen'));
const TimetableScreen = lazy(() => import('../pages/TimetableScreen'));
const FavoritesScreen = lazy(() => import('../pages/FavoritesScreen'));
const NotificationsScreen = lazy(() => import('../pages/NotificationsScreen'));
const ProfileScreen = lazy(() => import('../pages/ProfileScreen'));

// Profile Subpages
const TravelHistoryScreen = lazy(() => import('../pages/TravelHistoryScreen'));
const PaymentMethodsScreen = lazy(() => import('../pages/PaymentMethodsScreen'));
const PrivacySafetyScreen = lazy(() => import('../pages/PrivacySafetyScreen'));
const HelpSupportScreen = lazy(() => import('../pages/HelpSupportScreen'));

const UserRoutes = () => {
    return (
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background">Loading...</div>}>
            <MobileLayout>
                <Routes>
                    <Route path="/" element={<SplashScreen />} />
                    <Route path="/onboarding" element={<OnboardingScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/otp" element={<OTPScreen />} />

                    {/* Core App Routes */}
                    <Route path="/home" element={<HomeScreen />} />
                    <Route path="/search" element={<SearchResultsScreen />} />
                    <Route path="/route/:id" element={<RouteDetailsScreen />} />
                    <Route path="/track/:id" element={<LiveTrackingScreen />} />

                    {/* Tab Based Routes */}
                    <Route path="/timetable" element={<TimetableScreen />} />
                    <Route path="/favorites" element={<FavoritesScreen />} />
                    <Route path="/notifications" element={<NotificationsScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/profile/history" element={<TravelHistoryScreen />} />
                    <Route path="/profile/payment" element={<PaymentMethodsScreen />} />
                    <Route path="/profile/privacy" element={<PrivacySafetyScreen />} />
                    <Route path="/profile/help" element={<HelpSupportScreen />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </MobileLayout>
        </Suspense>
    );
};

export default UserRoutes;
