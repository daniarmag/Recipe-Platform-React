import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaStar } from 'react-icons/fa'; // Make sure you have `react-icons` installed

const TopChefsSection = () => {
  const { theme } = useTheme();
  const { darkMode } = theme;

  // Styles
  const sectionStyle = {
    padding: '50px 10%',
    background: '#FFFFFF', // Set the background to white
    color: darkMode === 'dark' ? '#FFFFFF' : '#2D3748',
    textAlign: 'center',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  };
  const imageStyle = {
    width: '100%', // Set a specific width
    height: '200px', // Set a specific height for all images
    objectFit: 'cover', // Cover the area without stretching
    borderRadius: '5px', // Optional: round the corners of the image
    marginBottom: '10px', // Add some space below the image
  };
  

  const chefCardStyle = {
    padding: '20px',
    background: darkMode === 'dark' ? '#2D3748' : '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'left', // Align text to the left

  };

  const chefs = [
    { name: 'May Caspi', recipes: 12, cuisine: 'Mediterranean', imageUrl: 'https://i.ibb.co/gFqJtKP/Whats-App-Image-2024-03-19-at-16-52-56-66c35714.jpg'},
    { name: 'Shay Garbuz', recipes: 15, cuisine: 'French', imageUrl: 'https://i.ibb.co/vLh0bMF/Whats-App-Image-2024-03-19-at-16-53-31-d6a9c86b.jpg'},
    { name: 'Matan Czukermann', recipes: 10, cuisine: 'Fusion' },
    { name: 'Daniel Armaganian', recipes: 8, cuisine: 'Italian' },
    { name: 'Tzahi', recipes: 9, cuisine: 'Middle Eastern' },
  ];
  const starStyle = {
    color: '#FFD700', // Gold color for stars
    marginRight: '5px',
  };
  const starsContainerStyle = {
    display: 'flex', // This will lay out the stars in a row instead of a column
    justifyContent: 'flex-start', // This will align stars to the start of the container
    marginTop: '10px', // Add some space between the chef info and the stars
  };


  return (
    <div id="top-chefs-section" style={sectionStyle}>
      <h2 className="text-5xl font-bold mb-6 text-left">OUR TOP CHEFS</h2>
      <div style={gridStyle}>
      {chefs.map((chef, index) => (
        <div key={index} style={chefCardStyle}>
            <img src={chef.imageUrl} alt={chef.name} style={imageStyle} />
            <h3 className="font-bold text-xl">{chef.name}</h3>
            <p>Recipes: {chef.recipes}</p>
            <p>Cuisine: {chef.cuisine}</p>
            <div style={starsContainerStyle}>
                {/* Render 4 filled stars for every chef */}
                {[...Array(4)].map((_, i) => (
                    <FaStar key={i} style={starStyle} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChefsSection;
