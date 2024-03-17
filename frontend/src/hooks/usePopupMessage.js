import { useState, useEffect } from 'react';

const usePopupMessage = (initialVisibility = false, duration = 3000) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setMessage(''); // Clear the message after duration
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [duration, isVisible]);

  const showPopup = (msg) => {
    setMessage(msg);
    setIsVisible(true);
  };

  return { isVisible, message, showPopup };
};

export default usePopupMessage;
