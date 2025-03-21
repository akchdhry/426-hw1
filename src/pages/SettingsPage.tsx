// pages/SettingsPage.tsx
import React from 'react';
import { useThemeContext } from '../contexts/ThemeContext.tsx';
import { useNotificationContext } from '../contexts/NotificationContext.tsx';
// import ThemeSettings from '../components/settings/ThemeSettings.tsx';
// import NotificationSettings from '../components/settings/NotificationSettings.tsx';

const SettingsPage: React.FC = () => {
  const {
    themeColor,
    fontSize,
    chartStyle,
    isDarkMode,
    setThemeColor,
    setFontSize,
    setChartStyle,
    toggleDarkMode,
  } = useThemeContext();

  const { state, updatePreferences } = useNotificationContext();

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <section className="settings-section">
        <h2>Appearance</h2>
        <ThemeSettings
          themeColor={themeColor}
          fontSize={fontSize}
          chartStyle={chartStyle}
          isDarkMode={isDarkMode}
          onThemeColorChange={setThemeColor}
          onFontSizeChange={setFontSize}
          onChartStyleChange={setChartStyle}
          onDarkModeToggle={toggleDarkMode}
        />
      </section>
      
      <section className="settings-section">
        <h2>Notifications</h2>
        <NotificationSettings
          preferences={state.preferences}
          onPreferencesChange={updatePreferences}
        />
      </section>
      
      <section className="settings-section">
        <h2>Data Management</h2>
        <div className="data-management-settings">
          <button className="danger-button">Clear All Activity Data</button>
          <button className="export-button">Export Data (CSV)</button>
          <button className="import-button">Import Data</button>
        </div>
      </section>
      
      <section className="settings-section">
        <h2>About</h2>
        <div className="about-info">
          <p>Carbon Footprint Tracker</p>
          <p>Version 1.0.0</p>
          <p>Created with React & TypeScript</p>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;