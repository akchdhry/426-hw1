// contexts/CarbonContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface Activity {
  id: string;
  type: string;
  description: string;
  carbonValue: number;
  date: string;
  category: 'transport' | 'food' | 'household' | 'shopping' | 'other';
}

interface CarbonState {
  activities: Activity[];
  totalCarbon: number;
  dailyData: { date: string; total: number }[];
  weeklyData: { week: string; total: number }[];
  monthlyData: { month: string; total: number }[];
  categoryData: { category: string; total: number }[];
}

type CarbonAction =
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'REMOVE_ACTIVITY'; payload: string }
  | { type: 'UPDATE_ACTIVITY'; payload: Activity }
  | { type: 'CALCULATE_TOTALS' };

// Initial state
const initialState: CarbonState = {
  activities: [],
  totalCarbon: 0,
  dailyData: [],
  weeklyData: [],
  monthlyData: [],
  categoryData: [],
};

// Sample initial data for demonstration
const sampleActivities: Activity[] = [
  {
    id: '1',
    type: 'Commute',
    description: 'Drive to work',
    carbonValue: 3.5,
    date: '2025-03-18',
    category: 'transport',
  },
  {
    id: '2',
    type: 'Meal',
    description: 'Vegetarian lunch',
    carbonValue: 1.2,
    date: '2025-03-18',
    category: 'food',
  },
  {
    id: '3',
    type: 'Electricity',
    description: 'Home energy use',
    carbonValue: 2.8,
    date: '2025-03-19',
    category: 'household',
  },
  {
    id: '4',
    type: 'Shopping',
    description: 'Clothing purchase',
    carbonValue: 5.2,
    date: '2025-03-19',
    category: 'shopping',
  },
  {
    id: '5',
    type: 'Transport',
    description: 'Bus ride',
    carbonValue: 1.5,
    date: '2025-03-20',
    category: 'transport',
  },
];

// Reducer function
const carbonReducer = (state: CarbonState, action: CarbonAction): CarbonState => {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case 'REMOVE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.filter((activity) => activity.id !== action.payload),
      };
    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.id === action.payload.id ? action.payload : activity
        ),
      };
    case 'CALCULATE_TOTALS':
      const totalCarbon = state.activities.reduce(
        (sum, activity) => sum + activity.carbonValue,
        0
      );

      // Calculate daily data
      const dailyMap = new Map<string, number>();
      state.activities.forEach((activity) => {
        const date = activity.date;
        dailyMap.set(date, (dailyMap.get(date) || 0) + activity.carbonValue);
      });
      const dailyData = Array.from(dailyMap).map(([date, total]) => ({ date, total }));

      // Calculate weekly data (simplified)
      const weeklyData = [
        { week: 'Week 1', total: 12.5 },
        { week: 'Week 2', total: 15.2 },
        { week: 'Week 3', total: 10.8 },
        { week: 'Week 4', total: 8.3 },
      ];

      // Calculate monthly data (simplified)
      const monthlyData = [
        { month: 'Jan', total: 45.2 },
        { month: 'Feb', total: 40.5 },
        { month: 'Mar', total: 38.2 },
      ];

      // Calculate category data
      const categoryMap = new Map<string, number>();
      state.activities.forEach((activity) => {
        categoryMap.set(
          activity.category,
          (categoryMap.get(activity.category) || 0) + activity.carbonValue
        );
      });
      const categoryData = Array.from(categoryMap).map(([category, total]) => ({
        category,
        total,
      }));

      return {
        ...state,
        totalCarbon,
        dailyData,
        weeklyData,
        monthlyData,
        categoryData,
      };
    default:
      return state;
  }
};

// Create context
const CarbonContext = createContext<{
  state: CarbonState;
  dispatch: React.Dispatch<CarbonAction>;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  removeActivity: (id: string) => void;
  updateActivity: (activity: Activity) => void;
} | undefined>(undefined);

// Provider component
export const CarbonContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(carbonReducer, {
    ...initialState,
    activities: [...sampleActivities],
  });

  // Calculate totals whenever activities change
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.activities]);

  // Actions
  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_ACTIVITY', payload: newActivity as Activity });
  };

  const removeActivity = (id: string) => {
    dispatch({ type: 'REMOVE_ACTIVITY', payload: id });
  };

  const updateActivity = (activity: Activity) => {
    dispatch({ type: 'UPDATE_ACTIVITY', payload: activity });
  };

  return (
    <CarbonContext.Provider
      value={{ state, dispatch, addActivity, removeActivity, updateActivity }}
    >
      {children}
    </CarbonContext.Provider>
  );
};

// Custom hook to use the carbon context
export const useCarbonContext = () => {
  const context = useContext(CarbonContext);
  if (context === undefined) {
    throw new Error('useCarbonContext must be used within a CarbonContextProvider');
  }
  return context;
};