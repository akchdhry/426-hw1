// components/QuickLogForm.tsx
import React, { useState } from 'react';
import { useCarbonContext } from '../contexts/CarbonContext';
import { useNotificationContext } from '../contexts/NotificationContext.tsx';

const QuickLogForm: React.FC = () => {
  const { addActivity } = useCarbonContext();
  const { addNotification } = useNotificationContext();
  const [activityType, setActivityType] = useState('');
  const [carbonValue, setCarbonValue] = useState('');
  const [category, setCategory] = useState<'transport' | 'food' | 'household' | 'shopping' | 'other'>('transport');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activityType || !carbonValue) {
      addNotification({
        title: 'Error',
        message: 'Please fill in all fields',
        type: 'error',
      });
      return;
    }

    addActivity({
      type: activityType,
      description: `Quick log: ${activityType}`,
      carbonValue: parseFloat(carbonValue),
      date: new Date().toISOString().split('T')[0],
      category,
    });

    addNotification({
      title: 'Activity Logged',
      message: `You've successfully logged ${activityType}`,
      type: 'success',
    });

    // Reset form
    setActivityType('');
    setCarbonValue('');
  };

  return (
    <div className="quick-log-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="activityType">Activity</label>
            <input
              type="text"
              id="activityType"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              placeholder="e.g., Car commute"
            />
          </div>

          <div className="form-group">
            <label htmlFor="carbonValue">Carbon (kg CO₂e)</label>
            <input
              type="number"
              id="carbonValue"
              value={carbonValue}
              onChange={(e) => setCarbonValue(e.target.value)}
              step="0.1"
              min="0"
              placeholder="e.g., 2.5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
            >
              <option value="transport">Transport</option>
              <option value="food">Food</option>
              <option value="household">Household</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Log Activity
        </button>
      </form>
    </div>
  );
};

export default QuickLogForm;