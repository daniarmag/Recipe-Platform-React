// useConfirmationDialog.js
import { useState } from 'react';

const useConfirmationDialog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const [onCancelCallback, setOnCancelCallback] = useState(null);
  const showConfirmationDialog = (onConfirm, onCancel) => {
    setIsVisible(true);

    setOnConfirmCallback(async () => {
      await onConfirm();
    //   setIsVisible(false);
    });
    setOnCancelCallback(() => {
       onCancel();
    //   setIsVisible(false);
    });
  };

  const handleConfirm = () => {
    onConfirmCallback();
  };

  const handleCancel = () => {
    onCancelCallback();
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
