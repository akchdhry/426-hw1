// App.tsx - Main application component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarbonContextProvider } from './contexts/CarbonContext.tsx';
import { ThemeContextProvider } from './contexts/ThemeContext.tsx';
import { NotificationContextProvider } from './contexts/NotificationContext.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ResourceLibrary from './pages/ResourceLibrary.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import ActivityLog from './pages/ActivityLog.tsx';
import Navbar from './components/Navbar.tsx';
import NotificationCenter from './components/NotificationCenter.tsx';

const App: React.FC = () => {
  // State to track if the welcome message has been shown
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Hide welcome message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ThemeContextProvider>
        <NotificationContextProvider>
          <CarbonContextProvider>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                {showWelcome && (
                  <div className="welcome-banner">
                    <h2>Welcome to your Carbon Footprint Tracker</h2>
                    <p>Track, visualize, and reduce your environmental impact</p>
                  </div>
                )}
                <NotificationCenter />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/log" element={<ActivityLog />} />
                  <Route path="/resources" element={<ResourceLibrary />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
            </div>
          </CarbonContextProvider>
        </NotificationContextProvider>
      </ThemeContextProvider>
    </Router>
  );
};

export default App;