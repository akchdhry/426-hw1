// pages/ActivityLog.tsx
import React, { useState } from 'react';
import { useCarbonContext, Activity } from '../contexts/CarbonContext';
import ActivityForm from '../components/ActivityForm.tsx';
import ActivityList from '../components/ActivityList.tsx';

const ActivityLog: React.FC = () => {
  const { state, addActivity, removeActivity, updateActivity } = useCarbonContext();
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
  };

  const handleSubmit = (activity: Activity | Omit<Activity, "id">) => {
    if (editingActivity) {
      // If we're editing, we know this has an ID
      updateActivity(activity as Activity);
    } else {
      // If we're adding, we know this doesn't have an ID
      addActivity(activity as Omit<Activity, "id">);
    }
    setEditingActivity(null);
  };

  const handleCancel = () => {
    setEditingActivity(null);
  };

  return (
    <div className="activity-log-container">
      <h1>Activity Log</h1>
      
      <div className="activity-form-container">
        <h2>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</h2>
        <ActivityForm 
          activity={editingActivity}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
      
      <div className="activity-list-container">
        <h2>Recent Activities</h2>
        <ActivityList 
          activities={state.activities}
          onEdit={handleEdit}
          onDelete={removeActivity}
        />
      </div>
    </div>
  );
};

export default ActivityLog;