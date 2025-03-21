// components/ActivityList.tsx
import React from 'react';
import { Activity } from '../contexts/CarbonContext';

interface ActivityListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, onEdit, onDelete }) => {
  // Sort activities by date, most recent first
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="activity-list">
      {sortedActivities.length === 0 ? (
        <p className="no-activities">No activities logged yet. Start tracking to see your data here!</p>
      ) : (
        <table className="activity-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Category</th>
              <th>Carbon (kg CO₂e)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedActivities.map((activity) => (
              <tr key={activity.id} className={`category-${activity.category}`}>
                <td>{new Date(activity.date).toLocaleDateString()}</td>
                <td>
                  <div className="activity-details">
                    <strong>{activity.type}</strong>
                    {activity.description && <p>{activity.description}</p>}
                  </div>
                </td>
                <td>
                  <span className={`category-badge ${activity.category}`}>
                    {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                  </span>
                </td>
                <td className="carbon-value">{activity.carbonValue.toFixed(1)}</td>
                <td className="actions">
                  <button
                    className="edit-button"
                    onClick={() => onEdit(activity)}
                    aria-label="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDelete(activity.id)}
                    aria-label="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityList;