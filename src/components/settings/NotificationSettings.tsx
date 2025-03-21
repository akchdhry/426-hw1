// components/settings/NotificationSettings.tsx
import React, { useState, useEffect } from 'react';
import { NotificationPreferences } from '../../contexts/NotificationContext';

interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onPreferencesChange: (prefs: Partial<NotificationPreferences>) => void;
}

/**
 * NotificationSettings component allows users to configure notification preferences
 * including enabling/disabling notifications, reminder frequency, timing, and types.
 */
const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  preferences,
  onPreferencesChange,
}) => {
  // Local state to track unsaved changes
  const [localPreferences, setLocalPreferences] = useState<NotificationPreferences>(preferences);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Update local state when props change
  useEffect(() => {
    setLocalPreferences(preferences);
    setHasChanges(false);
  }, [preferences]);

  // Update local state and track changes
  const updateLocalPreferences = (changes: Partial<NotificationPreferences>) => {
    const updatedPrefs = { ...localPreferences, ...changes };
    setLocalPreferences(updatedPrefs);
    setHasChanges(true);
  };

  // Apply changes to parent component
  const saveChanges = () => {
    onPreferencesChange(localPreferences);
    setHasChanges(false);
  };

  // Reset to original preferences
  const discardChanges = () => {
    setLocalPreferences(preferences);
    setHasChanges(false);
  };

  // Event handlers for different settings
  const handleToggleEnable = () => {
    updateLocalPreferences({ enabled: !localPreferences.enabled });
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLocalPreferences({
      reminderFrequency: e.target.value as 'daily' | 'weekly' | 'none',
    });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLocalPreferences({ reminderTime: e.target.value });
  };

  const handleToggleOption = (option: keyof Pick<NotificationPreferences, 'showActivity' | 'showGoals' | 'showTips'>) => {
    updateLocalPreferences({ [option]: !localPreferences[option] });
  };

  return (
    <div className="notification-settings">
      <div className="setting-group">
        <h3>Enable Notifications</h3>
        <div className="notification-toggle">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={localPreferences.enabled}
              onChange={handleToggleEnable}
              aria-label="Enable notifications"
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">{localPreferences.enabled ? 'On' : 'Off'}</span>
        </div>
      </div>

      {localPreferences.enabled && (
        <>
          <div className="setting-group">
            <h3>Reminder Frequency</h3>
            <select
              value={localPreferences.reminderFrequency}
              onChange={handleFrequencyChange}
              className="select-dropdown"
              aria-label="Select reminder frequency"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="none">None</option>
            </select>
          </div>

          {localPreferences.reminderFrequency !== 'none' && (
            <div className="setting-group">
              <h3>Reminder Time</h3>
              <input
                type="time"
                value={localPreferences.reminderTime}
                onChange={handleTimeChange}
                className="time-input"
                aria-label="Set reminder time"
              />
            </div>
          )}

          <div className="setting-group">
            <h3>Notification Types</h3>
            <div className="notification-options">
              <div className="notification-option">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={localPreferences.showActivity}
                    onChange={() => handleToggleOption('showActivity')}
                    aria-label="Show activity updates"
                  />
                  <span className="checkmark"></span>
                  Activity Updates
                </label>
              </div>
              <div className="notification-option">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={localPreferences.showGoals}
                    onChange={() => handleToggleOption('showGoals')}
                    aria-label="Show goal progress"
                  />
                  <span className="checkmark"></span>
                  Goal Progress
                </label>
              </div>
              <div className="notification-option">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={localPreferences.showTips}
                    onChange={() => handleToggleOption('showTips')}
                    aria-label="Show carbon reduction tips"
                  />
                  <span className="checkmark"></span>
                  Carbon Reduction Tips
                </label>
              </div>
            </div>
          </div>
        </>
      )}

      {hasChanges && (
        <div className="settings-actions">
          <button 
            className="save-button" 
            onClick={saveChanges}
            aria-label="Save notification preference changes"
          >
            Save Changes
          </button>
          <button 
            className="cancel-button" 
            onClick={discardChanges}
            aria-label="Discard notification preference changes"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;