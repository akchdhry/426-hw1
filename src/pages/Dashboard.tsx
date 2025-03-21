// pages/Dashboard.tsx
import React from 'react';
import { useCarbonContext } from '../contexts/CarbonContext';
import { useThemeContext } from '../contexts/ThemeContext.tsx';
import CarbonSummary from '../components/CarbonSummary.tsx';
import DailyTrend from '../components/charts/DailyTrend.tsx';
import CategoryDistribution from '../components/charts/CategoryDistribution.tsx';
// import MonthlyTrend from '../components/charts/MonthlyTrend.tsx';
// import WeeklyComparison from '../components/charts/WeeklyComparison.tsx';
import QuickLogForm from '../components/QuickLogForm.tsx';

const Dashboard: React.FC = () => {
  const { state } = useCarbonContext();
  const { chartStyle } = useThemeContext();

  return (
    <div className="dashboard-container">
      <h1>Carbon Footprint Dashboard</h1>
      
      <div className="dashboard-summary">
        <CarbonSummary 
          totalCarbon={state.totalCarbon} 
          activityCount={state.activities.length} 
        />
      </div>
      
      <div className="quick-log-section">
        <h2>Quick Log</h2>
        <QuickLogForm />
      </div>
      
      <div className="charts-container">
        <div className="chart-row">
          <div className="chart-card">
            <h2>Daily Carbon Footprint</h2>
            <DailyTrend data={state.dailyData} chartType={chartStyle} />
          </div>
          
          <div className="chart-card">
            <h2>Carbon by Category</h2>
            <CategoryDistribution data={state.categoryData} chartType={chartStyle} />
          </div>
        </div>
        
        <div className="chart-row">
          <div className="chart-card">
            <h2>Weekly Trend</h2>
            {/* <WeeklyComparison data={state.weeklyData} chartType={chartStyle} /> */}
          </div>
          
          <div className="chart-card">
            <h2>Monthly Overview</h2>
            {/* <MonthlyTrend data={state.monthlyData} chartType={chartStyle} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

