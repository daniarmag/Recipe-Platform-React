import React from 'react';
import { useTheme } from '../context/ThemeContext';
const Footer = () => {

  const { theme } = useTheme();
  const { darkMode } = theme;

  const footerStyle = {
    background: darkMode === 'dark'  ? 'linear-gradient(to bottom right, #1A202C, #2D3748)' : 'linear-gradient(to bottom right, #48BB78, #38A169)',
    color: '#FFFFFF', // Text color for both dark and light modes
    padding: '1rem', // Padding
  };

  return (
  
    <footer className=" text-center p-4" style={footerStyle}>
      <p>&copy; 2024 Recipe Platform. All rights reserved.</p>
    </footer>
  );
};

export default Footer;