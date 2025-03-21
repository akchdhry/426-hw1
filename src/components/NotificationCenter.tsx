// components/NotificationCenter.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNotificationContext, Notification } from '../contexts/NotificationContext.tsx';

const NotificationCenter: React.FC = () => {
  const { state, markAsRead, markAllAsRead, removeNotification } = useNotificationContext();
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
  };

  const handleDismiss = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeNotification(id);
  };

  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <div className="notification-center" ref={notificationRef}>
      <button className="notification-toggle" onClick={toggleOpen}>
        <span className="icon">🔔</span>
        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {state.notifications.length > 0 && (
              <button className="mark-all-read" onClick={handleMarkAllRead}>
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-list">
            {state.notifications.length === 0 ? (
              <p className="no-notifications">No notifications</p>
            ) : (
              state.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <button
                    className="dismiss-notification"
                    onClick={(e) => handleDismiss(e, notification.id)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;