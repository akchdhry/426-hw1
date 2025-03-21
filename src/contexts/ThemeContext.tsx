// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme options
export type ThemeColor = 'green' | 'blue' | 'purple' | 'dark';
export type FontSize = 'small' | 'medium' | 'large';

interface ThemeContextType {
  themeColor: ThemeColor;
  fontSize: FontSize;
  chartStyle: 'bar' | 'line' | 'pie';
  setThemeColor: (color: ThemeColor) => void;
  setFontSize: (size: FontSize) => void;
  setChartStyle: (style: 'bar' | 'line' | 'pie') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>('green');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [chartStyle, setChartStyle] = useState<'bar' | 'line' | 'pie'>('bar');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme changes to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeColor);
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.setAttribute('data-dark-mode', isDarkMode.toString());
  }, [themeColor, fontSize, isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        fontSize,
        chartStyle,
        setThemeColor,
        setFontSize,
        setChartStyle,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};