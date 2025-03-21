// contexts/NotificationContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
  read: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  reminderFrequency: 'daily' | 'weekly' | 'none';
  reminderTime: string;
  showActivity: boolean;
  showGoals: boolean;
  showTips: boolean;
}

interface NotificationState {
  notifications: Notification[];
  preferences: NotificationPreferences;
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp' | 'read'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<NotificationPreferences> };

// Initial state
const initialState: NotificationState = {
  notifications: [],
  preferences: {
    enabled: true,
    reminderFrequency: 'daily',
    reminderTime: '18:00',
    showActivity: true,
    showGoals: true,
    showTips: true,
  },
};

// Sample notifications for demonstration
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome!',
    message: 'Welcome to your Carbon Footprint Tracker. Start logging your activities now.',
    type: 'info',
    timestamp: Date.now() - 86400000, // 24 hours ago
    read: false,
  },
  {
    id: '2',
    title: 'Reminder',
    message: "Don't forget to log your activities for today.",
    type: 'warning',
    timestamp: Date.now() - 3600000, // 1 hour ago
    read: false,
  },
  {
    id: '3',
    title: 'Tip of the Day',
    message: 'Using public transport can reduce your carbon footprint by up to 30%.',
    type: 'success',
    timestamp: Date.now() - 7200000, // 2 hours ago
    read: true,
  },
];

// Reducer function
const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false,
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
    default:
      return state;
  }
};

// Create context
const NotificationContext = createContext<{
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
  ) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
} | undefined>(undefined);

// Provider component
export const NotificationContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    ...initialState,
    notifications: [...sampleNotifications],
  });

  // Actions
  const addNotification = (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
  ) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const updatePreferences = (prefs: Partial<NotificationPreferences>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: prefs });
  };

  // Schedule notifications based on preferences
  useEffect(() => {
    if (!state.preferences.enabled) return;

    // Daily reminder
    if (state.preferences.reminderFrequency === 'daily') {
      const now = new Date();
      const [hours, minutes] = state.preferences.reminderTime.split(':').map(Number);
      
      // Set reminder time
      const reminderTime = new Date();
      reminderTime.setHours(hours, minutes, 0, 0);
      
      // If time has passed for today, schedule for tomorrow
      if (now > reminderTime) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }
      
      const timeUntilReminder = reminderTime.getTime() - now.getTime();
      
      const timerId = setTimeout(() => {
        addNotification({
          title: 'Daily Reminder',
          message: "Don't forget to log your activities for today!",
          type: 'info',
        });
      }, timeUntilReminder);
      
      return () => clearTimeout(timerId);
    }
  }, [state.preferences]);

  return (
    <NotificationContext.Provider
      value={{
        state,
        dispatch,
        addNotification,
        removeNotification,
        markAsRead,
        markAllAsRead,
        updatePreferences,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationContext must be used within a NotificationContextProvider'
    );
  }
  return context;
};