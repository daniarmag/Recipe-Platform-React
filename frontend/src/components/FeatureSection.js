import React from 'react';
import { useTheme } from '../context/ThemeContext';

const FeatureSection = () => {
  const { theme } = useTheme();
  const { darkMode } = theme;

  // Styles
  const sectionStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '50px 10%', // Adjusted for padding and width
    background: darkMode === 'dark' ? 'linear-gradient(to bottom right, #1A202C, #2D3748)' : 'linear-gradient(to bottom right, #EDF2F7, #E2E8F0)',
    color: darkMode === 'dark' ? '#fff' : '#2D3748',
  };

  const imagesStyle = {
    display: 'flex', // Added for flex layout of images
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '50%', // Adjusted for two images
  };

  const imageStyle = {
    maxHeight: '350px', // Adjusted for two images
    maxWidth: '50%', // Each image can take up to half of the images container
    marginRight: '10px', // Adjust spacing between images
  };
  const textStyle = {
    maxWidth: '40%', // Adjust as needed
    textAlign: 'center',
  };

  // Content
  const featureTitle = "Delicious Meals from everywhere!";
  const featureDescription = "Our app is available on all platforms, so whether you're an iPhone user or prefer other devices, you can connect whenever and from everywhere. Experience the convenience of accessing your favorite recipes and meal plans on the go!";
  const featureImage2 = "https://i.ibb.co/rMzgHBQ/Screenshot-2024-03-19-122332-portrait.png"; // Replace with your image path
  const featureImage1 = "https://i.ibb.co/9G9LRvC/Screenshot-2024-03-19-122527-landscape.png"; // Replace with your image path
  return (
    <div id="feature-section" className="feature-section" style={sectionStyle}>
      <div style={imagesStyle}>
        <img src={featureImage1} alt="Feature 1" style={imageStyle} />
        <img src={featureImage2} alt="Feature 2" style={imageStyle} />
      </div>
      <div style={textStyle}>
        <h2 className="text-3xl font-bold mb-4">{featureTitle}</h2>
        <p>{featureDescription}</p>
        {/* You can place more content here if needed */}
      </div>
    </div>
  );
};

export default FeatureSection;
