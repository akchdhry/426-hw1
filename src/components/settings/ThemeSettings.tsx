// components/settings/ThemeSettings.tsx
import React from 'react';
import { ThemeColor, FontSize } from '../../contexts/ThemeContext';

interface ThemeSettingsProps {
  themeColor: ThemeColor;
  fontSize: FontSize;
  chartStyle: 'bar' | 'line' | 'pie';
  isDarkMode: boolean;
  onThemeColorChange: (color: ThemeColor) => void;
  onFontSizeChange: (size: FontSize) => void;
  onChartStyleChange: (style: 'bar' | 'line' | 'pie') => void;
  onDarkModeToggle: () => void;
}

/**
 * ThemeSettings component allows users to customize the application's appearance
 * including theme color, font size, chart style preferences, and dark mode.
 */
const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  themeColor,
  fontSize,
  chartStyle,
  isDarkMode,
  onThemeColorChange,
  onFontSizeChange,
  onChartStyleChange,
  onDarkModeToggle,
}) => {
  // Color theme options that match the ThemeColor type
  const colorOptions: ThemeColor[] = ['green', 'blue', 'purple', 'dark'];
  
  // Font size options that match the FontSize type
  const fontSizeOptions: FontSize[] = ['small', 'medium', 'large'];
  
  // Chart style options
  const chartStyleOptions: ('bar' | 'line' | 'pie')[] = ['bar', 'line', 'pie'];

  return (
    <div className="theme-settings">
      <div className="setting-group">
        <h3>Theme Color</h3>
        <div className="color-options">
          {colorOptions.map((color) => (
            <button
              key={color}
              className={`color-option ${color} ${themeColor === color ? 'active' : ''}`}
              onClick={() => onThemeColorChange(color)}
              aria-label={`${color} theme`}
              title={`${color.charAt(0).toUpperCase() + color.slice(1)} theme`}
            ></button>
          ))}
        </div>
      </div>

      <div className="setting-group">
        <h3>Font Size</h3>
        <div className="font-size-options">
          {fontSizeOptions.map((size) => (
            <button
              key={size}
              className={`font-option ${fontSize === size ? 'active' : ''}`}
              onClick={() => onFontSizeChange(size)}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="setting-group">
        <h3>Chart Style</h3>
        <div className="chart-style-options">
          {chartStyleOptions.map((style) => (
            <button
              key={style}
              className={`chart-option ${chartStyle === style ? 'active' : ''}`}
              onClick={() => onChartStyleChange(style)}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="setting-group">
        <h3>Dark Mode</h3>
        <div className="dark-mode-toggle">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={onDarkModeToggle}
              aria-label="Toggle dark mode"
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">{isDarkMode ? 'On' : 'Off'}</span>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;