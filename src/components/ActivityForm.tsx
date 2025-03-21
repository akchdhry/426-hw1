// components/ActivityForm.tsx
import React, { useState, useEffect } from 'react';
import { Activity } from '../contexts/CarbonContext';

interface ActivityFormProps {
  activity: Activity | null;
  onSubmit: (activity: Omit<Activity, 'id'> | Activity) => void;
  onCancel: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ activity, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    carbonValue: '',
    date: new Date().toISOString().split('T')[0],
    category: 'transport' as 'transport' | 'food' | 'household' | 'shopping' | 'other',
  });

  // Update form when editing activity
  useEffect(() => {
    if (activity) {
      setFormData({
        type: activity.type,
        description: activity.description,
        carbonValue: activity.carbonValue.toString(),
        date: activity.date,
        category: activity.category,
      });
    } else {
      // Reset form for new activity
      setFormData({
        type: '',
        description: '',
        carbonValue: '',
        date: new Date().toISOString().split('T')[0],
        category: 'transport',
      });
    }
  }, [activity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submittedActivity = {
      ...(activity ? { id: activity.id } : {}),
      type: formData.type,
      description: formData.description,
      carbonValue: parseFloat(formData.carbonValue),
      date: formData.date,
      category: formData.category,
    };

    onSubmit(submittedActivity as Activity);

    // Reset form if not editing
    if (!activity) {
      setFormData({
        type: '',
        description: '',
        carbonValue: '',
        date: new Date().toISOString().split('T')[0],
        category: 'transport',
      });
    }
  };

  return (
    <div className="activity-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Activity Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              placeholder="e.g., Car Travel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="transport">Transportation</option>
              <option value="food">Food</option>
              <option value="household">Household</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="carbonValue">Carbon Value (kg CO₂e)</label>
            <input
              type="number"
              id="carbonValue"
              name="carbonValue"
              value={formData.carbonValue}
              onChange={handleChange}
              step="0.1"
              min="0"
              required
              placeholder="e.g., 2.5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Provide details about this activity..."
          />
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {activity ? 'Update' : 'Add'} Activity
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;