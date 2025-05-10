import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import VoiceAssistant from './components/common/VoiceAssistant';

// Screens
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import Dashboard from './screens/Dashboard';
import SectorProfile from './screens/SectorProfile';
import ReelsPage from './screens/ReelsPage';
import RewardsPage from './screens/RewardsPage';
import FinesPage from './screens/FinesPage';
import VendorsPage from './screens/VendorsPage';
import HealthPage from './screens/HealthPage';
import TelegramBot from './components/common/TelegramBot';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sector/:id" element={<SectorProfile />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/fines" element={<FinesPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/health" element={<HealthPage />} />
        </Routes>
      </AnimatePresence>
      
      {/* Global Floating Components */}
      {location.pathname !== '/' && (
        <>
          <VoiceAssistant />
          <TelegramBot />
        </>
      )}
    </div>
  );
}

export default App;