// useConfirmationDialog.js
import { useState } from 'react';

// Custom hook for managing a confirmation dialog
const useConfirmationDialog = () => {
    // State variables to manage visibility and callbacks
  const [isVisible, setIsVisible] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const [onCancelCallback, setOnCancelCallback] = useState(null);
  
  // Function to show the confirmation dialog
  const showConfirmationDialog = (onConfirm, onCancel) => {
    setIsVisible(true);
    // Set onConfirm callback to execute onConfirm function and hide the dialog
    setOnConfirmCallback(() => {
      return async () => {
        await onConfirm();
        // Hide the dialog        
        setIsVisible(false);
      };
    });
    // Set onCancel callback to execute onCancel function and hide the dialog
    setOnCancelCallback(() => {
      return () => {
        onCancel();
        // Hide the dialog    
        setIsVisible(false);
      };
    });
  };

  // Function to handle confirmation
  const handleConfirm = () => {
    onConfirmCallback && onConfirmCallback();
  };

  // Function to handle cancellation
  const handleCancel = () => {
    onCancelCallback && onCancelCallback();
  };

  // Return state variables and functions to be used by components
  return {
    isVisible,
    setIsVisible,
    showConfirmationDialog,
    handleConfirm,
    handleCancel,
  };
};

export default useConfirmationDialog;
