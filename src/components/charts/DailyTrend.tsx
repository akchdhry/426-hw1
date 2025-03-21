// components/charts/DailyTrend.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useThemeContext } from '../../contexts/ThemeContext';

interface DailyTrendProps {
  data: { date: string; total: number }[];
  chartType: 'bar' | 'line' | 'pie';
}

const DailyTrend: React.FC<DailyTrendProps> = ({ data, chartType }) => {
  const { isDarkMode, themeColor } = useThemeContext();

  // Sort data by date
  const sortedData = [...data].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Format dates to be more readable
  const formattedData = sortedData.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  // Determine colors based on theme
  const getColorsByTheme = () => {
    const themeColors = {
      green: '#4CAF50',
      blue: '#2196F3',
      purple: '#9C27B0',
      dark: '#78909C',
    };
    return themeColors[themeColor];
  };

  const chartColor = getColorsByTheme();
  
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

  if (chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="formattedDate" 
            stroke={textColor}
            tick={{ fill: textColor, fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis 
            stroke={textColor}
            tick={{ fill: textColor, fontSize: 12 }}
            tickMargin={10}
            label={{ 
              value: 'kg CO₂e', 
              angle: -90, 
              position: 'insideLeft',
              fill: textColor,
              fontSize: 12
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? '#333' : '#fff',
              border: `1px solid ${chartColor}`,
              borderRadius: '4px',
              color: isDarkMode ? '#fff' : '#333',
            }}
            formatter={(value: number) => [`${value.toFixed(1)} kg CO₂e`, 'Carbon']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend wrapperStyle={{ color: textColor, fontSize: 12 }} />
          <Bar dataKey="total" name="Carbon Emissions" fill={chartColor} />
        </BarChart>
      </ResponsiveContainer>
    );
  } else if (chartType === 'line') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="formattedDate" 
            stroke={textColor}
            tick={{ fill: textColor, fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis 
            stroke={textColor}
            tick={{ fill: textColor, fontSize: 12 }}
            tickMargin={10}
            label={{ 
              value: 'kg CO₂e', 
              angle: -90, 
              position: 'insideLeft',
              fill: textColor,
              fontSize: 12
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? '#333' : '#fff',
              border: `1px solid ${chartColor}`,
              borderRadius: '4px',
              color: isDarkMode ? '#fff' : '#333',
            }}
            formatter={(value: number) => [`${value.toFixed(1)} kg CO₂e`, 'Carbon']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend wrapperStyle={{ color: textColor, fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="total"
            name="Carbon Emissions"
            stroke={chartColor}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  } else {
    // Fallback message for pie chart (not ideal for time series)
    return (
      <div className="chart-fallback">
        <p>Pie charts are not suitable for time-based data visualization.</p>
        <p>Please select Bar or Line chart type in Settings.</p>
      </div>
    );
  }
};

export default DailyTrend;