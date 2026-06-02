import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const themeColors = isDarkMode ? {
    bg: '#111827',
    bgCard: '#1F2937',
    text: '#F9FAFB',
    textMuted: '#9CA3AF',
    border: '#374151',
    navBg: 'rgba(17, 24, 39, 0.98)'
  } : {
    bg: '#FFFFFF',
    bgCard: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    navBg: 'rgba(255, 255, 255, 0.98)'
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

