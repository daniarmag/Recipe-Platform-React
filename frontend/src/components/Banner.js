import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Banner = () => {
    const [randomTip, setRandomTip] = useState('');
    const { theme } = useTheme();
    const { darkMode } = theme;

    const bannerStyle = {
        background: darkMode ==='dark'? 'linear-gradient(to bottom right, #1A202C, #2D3748)' : 'linear-gradient(to bottom right, #48BB78, #38A169)',
      };
      
    useEffect(() => {
        // Tips array
        const tips = [
            'Did you know? Apples are more effective than coffee at waking you up in the morning.',
            'Tip: Take a short walk every hour to improve productivity.',
            'Health Tip: Drink plenty of water throughout the day to stay hydrated.',
            'Did you know? Laughing can improve your cardiovascular health.',
            'Fitness Tip: Incorporate strength training exercises into your routine for overall health.',
            'Nutrition Tip: Include a variety of colorful vegetables in your meals for a range of nutrients.',
            'Sleep Tip: Aim for 7-9 hours of quality sleep each night for optimal health and well-being.',
            'Mindfulness Tip: Practice deep breathing or meditation to reduce stress and promote mental wellness.',
            'Exercise Tip: Find physical activities you enjoy to make staying active a fun part of your lifestyle.'
        ];

        // Get a random tip
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        setRandomTip(randomTip);
    }, []);

    return (
        <div id="banner" className="mt-6 text-center p-4 banner-section" style={bannerStyle}>
            <div className="container mx-auto">
                <div className="text-2xl font-bold mb-4 text-white">
                    {randomTip}
                </div>
            </div>
        </div>
    );
};

export default Banner;
