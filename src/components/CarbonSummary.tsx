// components/CarbonSummary.tsx
import React from 'react';
import { useNotificationContext } from '../contexts/NotificationContext.tsx';

interface CarbonSummaryProps {
  totalCarbon: number;
  activityCount: number;
}

const CarbonSummary: React.FC<CarbonSummaryProps> = ({ totalCarbon, activityCount }) => {
  const { addNotification } = useNotificationContext();

  // Function to determine carbon status and message
  const getCarbonStatus = () => {
    if (totalCarbon < 10) return { status: 'low', message: 'Great job keeping your carbon footprint low!' };
    if (totalCarbon < 30) return { status: 'medium', message: 'Your carbon footprint is moderate.' };
    return { status: 'high', message: 'Your carbon footprint is high. Consider reducing carbon-intensive activities.' };
  };

  const { status, message } = getCarbonStatus();

  const shareProgress = () => {
    addNotification({
      title: 'Progress Shared',
      message: 'Your carbon footprint summary has been saved!',
      type: 'success',
    });
  };

  return (
    <div className={`carbon-summary ${status}`}>
      <div className="summary-header">
        <h2>Your Carbon Summary</h2>
        <button className="share-button" onClick={shareProgress}>
          Share Progress
        </button>
      </div>

      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-value">{totalCarbon.toFixed(1)}</span>
          <span className="stat-label">kg CO₂e</span>
          <span className="stat-description">Total Carbon</span>
        </div>

        <div className="stat-item">
          <span className="stat-value">{activityCount}</span>
          <span className="stat-label">activities</span>
          <span className="stat-description">Logged</span>
        </div>

        <div className="stat-item">
          <span className="stat-value">{(totalCarbon / (activityCount || 1)).toFixed(1)}</span>
          <span className="stat-label">kg CO₂e</span>
          <span className="stat-description">Per Activity</span>
        </div>
      </div>

      <div className="carbon-status">
        <div className={`status-indicator ${status}`}></div>
        <p className="status-message">{message}</p>
      </div>
    </div>
  );
};

export default CarbonSummary;
