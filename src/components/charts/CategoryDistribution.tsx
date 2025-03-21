// components/charts/CategoryDistribution.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useThemeContext } from '../../contexts/ThemeContext.tsx';

interface CategoryDistributionProps {
  data: { category: string; total: number }[];
  chartType: 'bar' | 'line' | 'pie';
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ data, chartType }) => {
  const { isDarkMode, themeColor } = useThemeContext();

  // Ensure we have data
  if (!data || data.length === 0) {
    return <div className="no-data-message">No category data available</div>;
  }

  // Format category names
  const formattedData = data.map(item => ({
    ...item,
    categoryName: item.category.charAt(0).toUpperCase() + item.category.slice(1)
  }));

  // Colors for different categories
  const categoryColors = {
    transport: '#FF5722',
    food: '#4CAF50',
    household: '#2196F3',
    shopping: '#9C27B0',
    other: '#FFC107',
  };

  const COLORS = formattedData.map(item => 
    categoryColors[item.category as keyof typeof categoryColors] || '#78909C'
  );

  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

  if (chartType === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="total"
            nameKey="categoryName"
            label={({ categoryName, percent }) => `${categoryName}: ${(percent * 100).toFixed(0)}%`}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(1)} kg CO₂e`, 'Carbon']}
            contentStyle={{
              backgroundColor: isDarkMode ? '#333' : '#fff',
              borderRadius: '4px',
              color: isDarkMode ? '#fff' : '#333',
            }}
          />
          <Legend
            wrapperStyle={{ color: textColor, fontSize: 12 }}
            formatter={(value) => <span style={{ color: textColor }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  } else if (chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={formattedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            type="number" 
            stroke={textColor}
            tick={{ fill: textColor, fontSize: 12 }}
          />
          <YAxis 
            type="category" 
            dataKey="categoryName" 
            stroke={textColor}
            tick={{ fill: textColor, fontSize: 12 }}
            width={100}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(1)} kg CO₂e`, 'Carbon']}
            contentStyle={{
              backgroundColor: isDarkMode ? '#333' : '#fff',
              borderRadius: '4px',
              color: isDarkMode ? '#fff' : '#333',
            }}
          />
          <Legend wrapperStyle={{ color: textColor, fontSize: 12 }} />
          <Bar dataKey="total" name="Carbon Emissions">
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  } else {
    // Fallback for line chart (not ideal for categorical data)
    return (
      <div className="chart-fallback">
        <p>Line charts are not suitable for category distribution.</p>
        <p>Please select Bar or Pie chart type in Settings.</p>
      </div>
    );
  }
};

export default CategoryDistribution;