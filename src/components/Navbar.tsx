// components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext.tsx';
import { useNotificationContext } from '../contexts/NotificationContext.tsx';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isDarkMode } = useThemeContext();
  const { state } = useNotificationContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-brand">
        <Link to="/">
          <span className="logo">🌏</span>
          <span className="app-name">Carbon Tracker</span>
        </Link>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="menu-icon">≡</span>
      </button>

      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/log"
          className={location.pathname === '/log' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Log Activity
        </Link>
        <Link
          to="/resources"
          className={location.pathname === '/resources' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Resources
        </Link>
        <Link
          to="/settings"
          className={location.pathname === '/settings' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Settings
        </Link>
      </div>

      <div className="navbar-actions">
        <Link to="/notifications" className="notification-icon">
          <span className="icon">🔔</span>
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;