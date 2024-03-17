// useConfirmationDialog.js
import { useState } from 'react';

const useConfirmationDialog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const [onCancelCallback, setOnCancelCallback] = useState(null);
  
  const showConfirmationDialog = (onConfirm, onCancel) => {
    setIsVisible(true);
    setOnConfirmCallback(() => {
      return async () => {
        await onConfirm();
        setIsVisible(false);
      };
    });
    setOnCancelCallback(() => {
      return () => {
        onCancel();
        setIsVisible(false);
      };
    });
  };
  const handleConfirm = () => {
    onConfirmCallback && onConfirmCallback();
  };

  const handleCancel = () => {
    onCancelCallback && onCancelCallback();
  };

  return {
    isVisible,
    setIsVisible,
    showConfirmationDialog,
    handleConfirm,
    handleCancel,
  };
};

export default useConfirmationDialog;
