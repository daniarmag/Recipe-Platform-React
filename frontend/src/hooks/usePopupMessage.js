import { useState, useEffect } from 'react';

// Custom hook for managing popup messages
const usePopupMessage = (initialVisibility = false, duration = 3000) => {
  // State variables to manage visibility and message content
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const [message, setMessage] = useState('');

  // Effect to handle popup visibility and message duration
  useEffect(() => {
    let timer;
    if (isVisible) {
      // Set a timer to hide the popup after duration
      timer = setTimeout(() => {
        setIsVisible(false);
        // Clear the message after duration
        setMessage('');
      }, duration);
    }

    // Clean up function to clear the timer
    return () => clearTimeout(timer);
  }, [duration, isVisible]);

  // Function to show a popup with a message
  const showPopup = (msg) => {
    setMessage(msg);
    setIsVisible(true);
  };

  // Return state variables and function to be used by components
  return { isVisible, message, showPopup };
};

export default usePopupMessage;
